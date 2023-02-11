import React from "react";
import {SmileOutlined} from "@ant-design/icons";

export function IdenticalSpecs() {
    return (
        <section className="identical-specs">
            <SmileOutlined className="identical-smile"/><br/>
            OpenAPI Specifications are <strong>identical</strong>, nothing to report.
        </section>
    );
}