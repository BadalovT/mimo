import {Button, Drawer, FormInstance, Modal, Result, Space} from "antd";
import React, {SetStateAction, ReactNode} from "react";

type ModalProps = {
    mode: string;
    controller: string;
    handleCancel:
        | ((
        e: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
    ) => void)
        | undefined;
    handleOk:
        | ((e: React.MouseEvent<HTMLElement, MouseEvent>) => void)
        | undefined;
    //   disabled: boolean;
    // form: FormInstance<any>;
    children: ReactNode;
    width?: number;
    loading?: boolean
    isOpenModal?: boolean
};

const CrudDrawer = ({
                        mode,
                        handleCancel,
                        handleOk,
                        children,
                        controller,
                        width,
                        loading,
                        isOpenModal
                    }: //   disabled,
                        ModalProps) => {
    return (
        <Drawer
            //forceRender
            title={
                mode === "new"
                    ? `${controller} ƏLAVƏ ET`
                    : mode === "update"
                        ? `${controller} MƏLUMATLARINI YENİLƏ`
                        : mode === "propertyDetail"
                            ? ` Mülk Detalları`
                            : mode === "paymentList"
                                ? `Müqavilə üzrə ödənişlər`
                                : mode === "priceDetail"
                                    ? `${controller} Satış və Kiraye Məlumatları`
                                    : mode === "priceUpdate" ? `${controller} Satış və Kiraye Məlumatlarını Yenilə` : `${controller} Sil`
                }
            width={window.innerWidth > 900 ? width : window.innerWidth} //fullWidth
            // mask={false}
            onClose={handleCancel}
            open={isOpenModal}
            extra={
                (mode !== "propertyDetail" && mode!== "paymentList") && <Space>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button type="primary" onClick={handleOk} loading={loading}>
                        OK
                    </Button>
                </Space>
            }
            getContainer={false}
            maskClosable={false}
        >
            <>{children}</>
        </Drawer>
    );
};

export default CrudDrawer;
