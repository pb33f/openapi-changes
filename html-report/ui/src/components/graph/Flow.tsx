import React, {useEffect, useRef, useState} from 'react';
import {
    Canvas,
    CanvasPosition, CanvasRef,
    Edge,
    EdgeData, ElkRoot,
    MarkerArrow,
    Node,
    NodeChildProps,
    NodeData,
    NodeProps, Port,
    useSelection
} from 'reaflow';
import data from '../../../data.json';
import * as Styled from "./styled";
import {ReactZoomPanPinchRef, TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {VscDiffAdded, VscDiffRemoved, VscEdit} from "react-icons/vsc";
import {Change} from "@/model/change";
import {ChangeState, DrawerState, GraphState, useChangeStore, useDrawerStore, useGraphStore} from "@/model/store";
import {CheckPropIsVerb, GetVerbColor} from "@/components/verb/Verb";
import {Button, Space, Tag} from "antd";
import './Flow.css';
import {
    ArrowDownOutlined,
    ArrowRightOutlined, NodeIndexOutlined,
    ReloadOutlined,
    ZoomInOutlined,
    ZoomOutOutlined
} from "@ant-design/icons";


const nodeData = data.reportItems[0].graph.nodes
const edgeData = data.reportItems[0].graph.edges


export function getNextDirection(direction: "LEFT" | "RIGHT" | "DOWN" | "UP") {
    switch (direction) {
        case "RIGHT":
            return "DOWN";

        case "DOWN":
            return "LEFT";

        case "LEFT":
            return "UP";

        default:
            return "RIGHT";
    }
}


const HorizontalFlow = () => {

    const drawerOpen = useDrawerStore((state: DrawerState) => state.drawerOpen)
    const setCurrentChange = useChangeStore((state: ChangeState) => state.setCurrentChange)
    const setSelectedKeysInState = useChangeStore((state: ChangeState) => state.setSelectedChangeKeys)
    const toggleDrawer = useDrawerStore((state: DrawerState) => state.toggleDrawer)
    const direction = useGraphStore((state: GraphState) => state.view)
    const setDirection = useGraphStore((state: GraphState) => state.setDirection)
    const canvasRef = useRef<CanvasRef | null>(null);
    const transRef = useRef(null);
    const setZoomPanPinch = useGraphStore(state => state.setZoomPanPinch);
    const zoomPanPinch = useGraphStore(state => state.zoomPanPinch);

    const [nodes, setNodes] = useState<NodeData[]>(nodeData)
    const [edges] = useState<EdgeData[]>(edgeData)
    const [selections, setSelections] = useState<string[]>([]);

    const onInit = React.useCallback(
        (ref: ReactZoomPanPinchRef) => {
            setZoomPanPinch(ref);
        },
        [setZoomPanPinch]
    );

    let scale = 1;
    if (window.innerWidth < 1000) {
        scale = 0.3
    }

    const maxWidth = window.innerWidth - 50;
    const maxHeight = window.innerHeight - 355;

    const rotateGraphDirection = () => {
        setDirection(getNextDirection(direction))
        setNodes([...nodes]); // will trigger a layout change.
    }

    const [size, setSize] = React.useState({
        width: maxWidth,
        height: maxHeight
    });

    const onNodeClick = (event: any, node: NodeData) => {
        // check node has changes, if not, ignore click
        if (node.data) {
            setCurrentChange(node.data)
            setSelections([node.id])
            setSelectedKeysInState([node.id])
            if (!drawerOpen) {
                toggleDrawer();

            }
        }
    }

    const onCanvasClick = (event: any) => {
        if (drawerOpen) {
            toggleDrawer();
        }
    }


    const onLayoutChange = React.useCallback(
        (layout: ElkRoot) => {
            if (layout.width && layout.height) {
                setSize({
                    width: (layout.width as number),
                    height: (maxHeight as number),
                });
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        const canvas = document.querySelector(".changes-canvas") as HTMLElement;
                        if (zoomPanPinch && canvas) zoomPanPinch.zoomToElement(canvas);
                    });
                });
            }
        },
        [size.height, size.width]
    );

    return (
        <TransformWrapper
            centerOnInit={true}
            onInit={onInit}
            ref={transRef}
            minScale={0.05}
            maxScale={4}
            limitToBounds={false}
            initialScale={scale}
            wheel={{step: 0.08}}
            zoomAnimation={{animationType: "easeOutQuad"}}
            doubleClick={{disabled: true}}
            onPanning={ref => ref.instance.wrapperComponent?.classList.add("dragging")}
            onPanningStop={ref =>
                ref.instance.wrapperComponent?.classList.remove("dragging")
            }
        >
            {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                <React.Fragment>
                    <div style={{position: 'absolute', right: '0', zIndex: '10'}}>
                        <Space>
                            <Button type="primary"
                                    ghost={true}
                                    onClick={() => zoomIn()}
                                    icon={<ZoomInOutlined/>}
                                    size='small'/>
                            <Button type="primary"
                                    ghost={true}
                                    onClick={() => zoomOut()}
                                    icon={<ZoomOutOutlined/>}
                                    size='small'/>
                            <Button type="primary"
                                    ghost={true}
                                    onClick={() => resetTransform()}
                                    icon={<ReloadOutlined/>}
                                    size='small'/>

                            <Button type="primary"
                                    ghost={true}
                                    onClick={rotateGraphDirection}
                                    icon={<NodeIndexOutlined/>}
                                    size='small'/>
                        </Space>
                    </div>
                    <TransformComponent
                        wrapperStyle={{
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                        }}
                    >
                        <Canvas
                            ref={canvasRef}
                            className="changes-canvas"
                            fit={true}
                            nodes={nodes}
                            zoomable={false}
                            readonly={false}
                            animated={false}
                            maxHeight={size.height}
                            onLayoutChange={onLayoutChange}
                            maxWidth={size.width}
                            dragEdge={null}
                            dragNode={null}
                            onCanvasClick={onCanvasClick}
                            edges={edges}
                            defaultPosition={CanvasPosition.CENTER}
                            selections={selections}
                            direction={direction}
                            arrow={<MarkerArrow style={{fill: 'var(--secondary-color)'}}/>}
                            edge={props => <Edge {...props} className='edge'
                                                 style={{stroke: 'var(--secondary-color)'}}/>}
                            node={props => <CustomNode {...props} onClick={onNodeClick}
                            />}
                        />
                    </TransformComponent>
                </React.Fragment>
            )}
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
export default HorizontalFlow;
