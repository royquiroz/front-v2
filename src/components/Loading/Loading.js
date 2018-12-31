import React from "react";
import { Spin } from "antd";

const Loading = ({ loading }) => (
  <Spin
    tip="Cargando..."
    size="large"
    spinning={loading}
    style={{ paddingTop: "500px" }}
  >
    <div style={{ width: "100%" }}>{""}</div>
  </Spin>
);

export default Loading;
