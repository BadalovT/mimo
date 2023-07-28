import { Card, Col, Row } from "antd";
import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
interface childrenProps {
  children: ReactNode;
}
const FullWidthCard = ({ children }: childrenProps) => {
  return (
    <div >
      <Row>
        <Col sm={24} xs={24}>
          <div className="card">
            {children}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FullWidthCard;
