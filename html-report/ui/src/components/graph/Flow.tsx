// Copyright 2023 Princess B33f Heavy Industries / Dave Shanley
// SPDX-License-Identifier: MIT

import React, {useContext, useEffect, useRef, useState} from 'react';
import {Canvas, CanvasPosition, CanvasRef, Edge, EdgeData, ElkRoot, MarkerArrow, NodeData} from 'reaflow';
import {ReactZoomPanPinchRef, TransformComponent, TransformWrapper} from "react-zoom-pan-pinch";
import {
    ChangeState,
    DrawerState,
    GraphState,
    ReportState,
    useChangeStore,
    useDrawerStore,
    useGraphStore, useReportStore,

} from "@/model/store";
import {Button, Space} from "antd";
import './Flow.css';
import {NodeIndexOutlined, ReloadOutlined, ZoomInOutlined, ZoomOutOutlined} from "@ant-design/icons";
import {ChangeNode} from "@/components/graph/ChangeNode";
import {getNextDirection} from "@/utils/utils";
import {Report} from "@/model/report";

export const HorizontalFlow = () => {
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
    const report: Report | undefined = useReportStore((report: ReportState) => report.report)
    const nodeData: NodeData[] | undefined = useReportStore((report: ReportState) => report.selectedReportItem?.graph?.nodes)
    const edgeData: EdgeData[] | undefined = useReportStore((report: ReportState) => report.selectedReportItem?.graph?.edges)

    if (!nodeData || !edgeData) {
        return (<div>unable to render graph, no nodes or edges!</div>)
    }

    const [nodes, setNodes] = useState<NodeData[]>(nodeData)
    const [edges, setEdges] = useState<EdgeData[]>(edgeData)
    const [selections, setSelections] = useState<string[]>([]);
    const maxWidth = 2000;
    const maxHeight = 1000;

    let timer: any
    const changeSize = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            setSize({
                width: maxWidth,
                height: maxHeight,
            });
        }, 100)
    }

    const watchSize = () => {
        changeSize()
    }

    useEffect(() => {
        // render the entire thing once things change.
        setNodes([...nodeData]);
        setEdges([...edgeData]);
    }, [nodeData, edgeData])

    const onInit = React.useCallback(
        (ref: ReactZoomPanPinchRef) => {
            window.addEventListener('resize', () => {
                watchSize()
            })
            // if we're dealing with just a left/right, start off facing right.
            if (report && report.reportItems.length  <= 2) {
                setDirection('RIGHT')
            }
            setZoomPanPinch(ref);
        },
        [setZoomPanPinch]
    );


    // const maxWidth = window.innerWidth - 50;
    // const maxHeight = window.innerHeight - 328;

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
                const areaSize = layout.width * layout.height;
                const changeRatio = Math.abs((areaSize * 100) / (size.width * size.height) - 100);
                const width = (layout.width as number) + 500;
                setSize({
                    width: width,
                    height: maxHeight,
                });
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        if (changeRatio > 20 ) {
                            const canvas = document.querySelector(".changes-canvas") as HTMLElement;
                            if (zoomPanPinch && canvas) {
                                zoomPanPinch.zoomToElement(canvas);
                            }
                        }
                    });
                });
            }
        },
        [size.height, size.width, zoomPanPinch]
    );
    let scale = 1.5;
    const mobile = (window.innerWidth < 1000)
    let fit = true;
    if (mobile) {
        fit = false;
        scale = 0.4;
    }

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
            }>
            {({zoomIn, zoomOut, resetTransform, ...rest}) => (
                <React.Fragment>
                    <div style={{backgroundColor: 'var(--background-color)', position: 'absolute', top: '10px', right: '10px', zIndex: '10'}}>
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
                            height: "calc(100vh - 195px)",
                            overflow: "hidden",
                        }}
                    ><Canvas
                        ref={canvasRef}
                        className="changes-canvas"
                        fit={fit}
                        nodes={nodes}
                        zoomable={false}
                        readonly={false}
                        animated={true}
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
                        node={props => <ChangeNode {...props} onClick={onNodeClick}
                        />}
                    />
                    </TransformComponent>
                </React.Fragment>
            )}
        </TransformWrapper>
    );
};

export default HorizontalFlow;
