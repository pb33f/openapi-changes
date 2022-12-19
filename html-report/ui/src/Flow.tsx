import React, {useState} from 'react';
import {
    Canvas,
    CanvasPosition,
    Edge,
    EdgeData,
    MarkerArrow,
    Node,
    NodeChildProps,
    NodeData,
    NodeProps,
    useSelection
} from 'reaflow';
import nodeData from './nodes.json';
import edgeData from './edges.json';
import * as Styled from "./styled";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {VscDiffAdded, VscDiffRemoved, VscEdit} from "react-icons/vsc";
import {DrawerState, useChangeStore} from "./App";

export interface Change {
    breaking: boolean;
    change: number;
    context: ChangeContext;
    new: string;
    original:string;
    property: string;
}

export interface ChangeContext {
    newColumn: number;
    newLine: number;
    originalLine: number;
    originalCol: number;
}


const HorizontalFlow = () => {


    const toggleDrawer = useChangeStore((state: DrawerState) => state.toggleDrawer)



    const [nodes, setNodes] = useState<NodeData[]>(nodeData)
    const [edges, setEdges] = useState<EdgeData[]>(edgeData)

    const { selections, onCanvasClick, onClick, onKeyDown, clearSelections } = useSelection({
        nodes,
        edges,
        selections: ['1'],
        onDataChange: (n, e) => {
            console.info('Data changed', n, e);
            setNodes(n);
            setEdges(e);
        },
        onSelection: (s) => {
            console.info('Selection', s);
        }
    });


    return (

        <TransformWrapper
            maxScale={2}
            minScale={0.05}
            initialScale={1}
            wheel={{ step: 0.08 }}
            zoomAnimation={{ animationType: "linear" }}
            doubleClick={{ disabled: true }}

            onPanning={ref => ref.instance.wrapperComponent?.classList.add("dragging")}
            onPanningStop={ref =>
                ref.instance.wrapperComponent?.classList.remove("dragging")
            }
        >
            <TransformComponent
                wrapperStyle={{
                    width: "95vw",
                    height: "58vh",
                    overflow: "hidden"
                }}
            >


        <Canvas
            fit={false}
            nodes={nodes}
            zoom={0.9}
            edges={edges}
            defaultPosition={CanvasPosition.TOP}
            selections={selections}
            direction="RIGHT"
            arrow={<MarkerArrow style={{ fill: '#b685ff' }} />}
            edge={props => <Edge {...props}
                                 style={{ stroke: '#b685ff'}}
            />}
            node={props => <CustomNode {...props}  onClick={toggleDrawer}


            />}
        />
            </TransformComponent>
        </TransformWrapper>
    );
};

export const CustomNode = (nodeProps: NodeProps) => {
    const ref = React.useRef(null);


    return (
        <Node {...nodeProps} label={<React.Fragment />}
            style={{ stroke: '#0d1117', fill: '#0d1117' }}
        >
            {(props: NodeChildProps) => {


                if (props.node.data) {
                    const change: Change = props.node.data;
                    let changeType = "Modified"
                    let changeIcon = <VscEdit/>
                    switch (props.node.data.change) {
                        case 2:
                            changeType = "Property Added";
                            changeIcon = <VscDiffAdded/>
                            break;
                        case 3:
                            changeType = "Object Added";
                            changeIcon = <VscDiffAdded/>
                            break;
                        case 4:
                            changeType = "Object Removed";
                            changeIcon = <VscDiffRemoved/>
                            break;
                        case 5:
                            changeType = "Property Removed "
                            changeIcon = <VscDiffRemoved/>
                            break;
                    }

                    // todo start here tomorrow.
                    let originalVal;
                    let newVal;
                    let height = props.height;
                    let width = props.width;
                    if (change.new) {
                        newVal = (<div className='changed'>{change.new}</div>);
                        //height += 50
                    }
                    if (change.original) {
                        originalVal = (<div className='original'>{change.original}</div>);
                    }
                    if (change.original !== "" && change.new !== "") {
                        originalVal = null;
                    }


                    return (
                        <Styled.StyledForeignObject
                            width={width}
                            height={height}
                            x={0}
                            y={0}
                            ref={ref}
                            isObject
                            isBreaking={change.breaking}
                        ><div className='node'>
                            {changeIcon} {change.property}<br/>
                            {originalVal}
                            {newVal}
                        </div></Styled.StyledForeignObject>

                    )


                } else {

                    return (
                        <Styled.StyledForeignObject
                            width={props.width}
                            height={props.height}
                            x={0}
                            y={0}
                            ref={ref}
                        ><div className='node'>{props.node.text}</div>
                        </Styled.StyledForeignObject>

                    )

                }
            }}

            </Node>
    )
}


export interface CustomNodeProps {
    node: NodeData;
    x: number;
    y: number;
    hasCollapse?: boolean;
}

const ObjectNode: React.FC<CustomNodeProps> = ({ node, x, y }) => {
    const { text, width, height, data } = node;
    const ref = React.useRef(null);

    if (data.isEmpty) return null;

    return (
        <Styled.StyledForeignObject
            width={width}
            height={height}
            x={0}
            y={0}
            ref={ref}
            isObject
        >
          Well, this is a surprise.
        </Styled.StyledForeignObject>
    );
};
export default HorizontalFlow;
