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
    NodeProps, Port,
    useSelection
} from 'reaflow';
import data from '../../../data.json';
import * as Styled from "./styled";
import {TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {VscDiffAdded, VscDiffRemoved, VscEdit} from "react-icons/vsc";
import {Change} from "@/model/change";
import {ChangeState, DrawerState, useChangeStore, useDrawerStore} from "@/model/store";
import {CheckPropIsVerb, GetVerbColor} from "@/components/change_view/Verb";
import {Tag} from "antd";
import './Flow.css';


const nodeData = data.graph.nodes
const edgeData = data.graph.edges

const HorizontalFlow = () => {

    const drawerOpen = useDrawerStore((state: DrawerState) => state.drawerOpen)
    const setCurrentChange = useChangeStore((state: ChangeState) => state.setCurrentChange)
    const setSelectedKeysInState = useChangeStore((state: ChangeState) => state.setSelectedChangeKeys)
    const toggleDrawer = useDrawerStore((state: DrawerState) => state.toggleDrawer)
    const [nodes] = useState<NodeData[]>(nodeData)
    const [edges] = useState<EdgeData[]>(edgeData)

    const [selections, setSelections] = useState<string[]>([]);


    return (
        <TransformWrapper
            maxScale={2}
            minScale={0.05}
            initialScale={0.8}
            wheel={{step: 0.08}}
            zoomAnimation={{animationType: "linear"}}
            doubleClick={{disabled: true}}
            onPanning={ref => ref.instance.wrapperComponent?.classList.add("dragging")}
            onPanningStop={ref =>
                ref.instance.wrapperComponent?.classList.remove("dragging")
            }
        >

            <TransformComponent
                wrapperStyle={{
                    width: "100%",
                    height: "calc(100vh - 350px)",
                    overflow: "hidden"
                }}
            >
                <Canvas
                    fit={true}
                    nodes={nodes}
                    zoomable={false}
                    readonly={false}
                    animated={true}
                    dragEdge={null}
                    dragNode={null}
                    onCanvasClick={(event) => {
                        setSelections([]);
                        if (drawerOpen) {
                            toggleDrawer();
                        }
                    }}
                    edges={edges}
                    defaultPosition={CanvasPosition.CENTER}
                    selections={selections}
                    direction="RIGHT"
                    arrow={<MarkerArrow style={{fill: 'var(--secondary-color)'}}/>}
                    edge={props => <Edge {...props} className='edge' style={{stroke: 'var(--secondary-color)'}}/>}
                    node={props => <CustomNode {...props}
                                               onClick={(event: any, node: NodeData) => {


                                                   // check node has changes, if not, ignore click
                                                   if (node.data) {
                                                       setCurrentChange(node.data)
                                                       setSelections([node.id])
                                                       setSelectedKeysInState([node.id])
                                                       if (!drawerOpen) {
                                                           toggleDrawer();

                                                       }
                                                   }
                                               }}
                    />}
                />
            </TransformComponent>

        </TransformWrapper>
    );
};

export const CustomNode = (nodeProps: NodeProps) => {
    const ref = React.useRef(null);


    return (
        <Node {...nodeProps} label={<React.Fragment/>}
              style={{stroke: '#0d1117', fill: 'transparent'}}
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

                    let originalVal;
                    let newVal;
                    let height = props.height;
                    let width = props.width;
                    if (change.new) {
                        newVal = (<div className='changed'>{change.new}</div>);
                    }
                    if (change.original) {
                        originalVal = (<div className='original'>{change.original}</div>);
                    }
                    if (change.new) {
                        originalVal = null;
                    }

                    let changeProperty: JSX.Element = (<>{change.property}</>);
                    if (CheckPropIsVerb(change.property)) {
                        changeProperty = (<Tag color={GetVerbColor(change.property)}
                                               className='graph-verb'>{change.property.toUpperCase()}</Tag>)
                    }

                    return (
                        <Styled.StyledForeignObject
                            width={width}
                            height={height}
                            ref={ref}
                            isObject
                            isBreaking={change.breaking}
                            isClickable={true}
                        >
                            <div className='node'>
                                {changeIcon} {changeProperty}<br/>
                                {originalVal}
                                {newVal}
                            </div>
                        </Styled.StyledForeignObject>
                    );
                } else {

                    // not a leaf node,
                    let changeProperty: JSX.Element = (<>{props.node.text}</>);
                    if (CheckPropIsVerb(props.node.text)) {
                        changeProperty = (<Tag color={GetVerbColor(props.node.text)}
                                               className='graph-verb'>{props.node.text.toUpperCase()}</Tag>)
                    }

                    return (
                        <Styled.StyledForeignObject
                            width={props.width}
                            height={props.height}
                            ref={ref}
                        >
                            <div className='node'>{changeProperty}</div>
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

const ObjectNode: React.FC<CustomNodeProps> = ({node, x, y}) => {
    const {text, width, height, data} = node;
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
