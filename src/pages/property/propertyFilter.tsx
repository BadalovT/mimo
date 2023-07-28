import {Button, Col, DatePicker, Input, InputNumber, Row, Select, Slider, Switch, TimePicker} from "antd";
import React, {useContext} from "react";
import {BlockRes, FloorRes} from "../../types/lookUpType";
import {FilterContext} from "./context/filterContext";
import {useAppSelector} from "../../redux/hook";


const {RangePicker} = DatePicker;
const {Option} = Select;

type PropertyFilterProps = {
    // name: propertyFilterAction;
    // setName: React.Dispatch<React.SetStateAction<propertyFilterAction>>;
    // rentPrice: propertyFilterAction | null,
    // setRentPrice: React.Dispatch<React.SetStateAction<propertyFilterAction>>;
    // area: propertyFilterAction,
    // setArea: React.Dispatch<React.SetStateAction<propertyFilterAction>>;
    // rentStatus: propertyFilterAction,
    // setRentStatus: React.Dispatch<React.SetStateAction<propertyFilterAction>>;
    // propertyTypeName: propertyFilterAction,
    // setPropertyTypeName: React.Dispatch<React.SetStateAction<propertyFilterAction>>;
    // blockName: propertyFilterAction,
    // setBlockName: React.Dispatch<React.SetStateAction<propertyFilterAction>>;
    // cityName: propertyFilterAction,
    // setCityName: React.Dispatch<React.SetStateAction<propertyFilterAction>>;
    // stateName: propertyFilterAction,
    // setStateName: React.Dispatch<React.SetStateAction<propertyFilterAction>>;
    // metroName: propertyFilterAction,
    // setMetroName: React.Dispatch<React.SetStateAction<propertyFilterAction>>;
    // floorName: propertyFilterAction,
    // roomName: propertyFilterAction,
    // setRoomName: React.Dispatch<React.SetStateAction<propertyFilterAction>>;
    // isRepair: boolean;
    onFilterData: () => void;
    onRefleshFilter: () => void;
};


const PropertyFilter = ({
                            // name,
                            // setName,
                            // rentPrice,
                            // setRentPrice,
                            // area,
                            // setArea,
                            // rentStatus,
                            // setRentStatus,
                            // propertyTypeName,
                            // setPropertyTypeName,
                            // blockName,
                            // setBlockName,
                            // cityName,
                            // setCityName,
                            // stateName,
                            // metroName,
                            // floorName,
                            // roomName,
                            // isRepair,
                            onFilterData,
                            onRefleshFilter,
                        }: PropertyFilterProps) => {
    const {filter, setFilter, updateFilterByKey} = useContext(FilterContext)
    const {
        allBlock,
        allFloor,
        allRooms,
        allPropertyType,
        allState,
        allCity,
        allMetro,

    } = useAppSelector((state) => state.lookUpSlice);
    const statusMarks = {
        0: "",
        50: "aktiv",
        100: "aktiv deyil",
    };
    const repairMarks = {
        0: "",
        50: "təmir edilib",
        100: "təmir edilməyib",
    };
    return (
        <>
            <Row gutter={[16, 16]}>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Mülk adı</label>
                        <Input
                            className=" form-control-sm form-control mb-50"
                            autoComplete="off"
                            placeholder="name"
                            value={filter.name?.value}
                            onChange={(e) => {
                                updateFilterByKey(e.target.value, "name")
                            }
                            }
                        />
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Satış qiyməti</label>
                        <InputNumber
                            style={{width: "100%"}}
                            className=" form-control-sm form-control mb-50"
                            autoComplete="off"
                            type="number"
                            placeholder="Satış qiyməti"
                            value={filter.rentPrice?.value}
                            onChange={(e) => {
                                if (typeof e === "number") {
                                    updateFilterByKey(String(e), "rentPrice")
                                }
                            }}
                        />
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Sahə</label>
                        <InputNumber
                            style={{width: "100%"}}
                            className=" form-control-sm form-control mb-50"
                            autoComplete="off"
                            type="number"
                            placeholder="Sahə"
                            value={filter.area?.value}
                            onChange={(e) => {
                                if (typeof e === "number") {
                                    // setRentPrice({
                                    //     ...rentPrice,
                                    //     value: String(e),
                                    //     field: "rentPrice",
                                    //     operator: "eq",
                                    // });
                                    updateFilterByKey(String(e), "area")
                                }
                            }}
                        />
                    </div>
                </Col>
                {/*<Col xs={12} md={4}>*/}
                {/*    <div*/}
                {/*        style={{*/}
                {/*            marginTop: "15px",*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <label className="m-r-05">Kirayə statusu </label>*/}
                {/*        <Switch*/}
                {/*            checked={filter.rentStatus?.value === "true"}*/}
                {/*            checkedChildren="bəli"*/}
                {/*            unCheckedChildren="xeyr"*/}
                {/*            onChange={(e) =>*/}
                {/*                updateFilterByKey(String(e), "rentStatus")*/}
                {/*            }*/}
                {/*        />*/}
                {/*    </div>*/}
                {/*</Col>*/}
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Otaq</label>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            showSearch
                            placeholder="Otaq seçin"
                            optionFilterProp="children"
                            value={filter.roomId?.value ?+filter.roomId?.value : null}
                            onChange={(e, select) =>
                                updateFilterByKey(String(e), "roomId")
                            }
                            filterOption={(input: string, option: any) =>
                                option.children.toLowerCase().includes(input.toLowerCase())
                            }
                        >
                            <Option value="">heç biri</Option>
                            {allRooms?.map((opt) => (
                                <Option key={opt.key} value={opt.key}>
                                    {opt.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </Col>

                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Mülk növü</label>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            showSearch
                            placeholder="Mülk növü seçin"
                            optionFilterProp="children"
                            value={filter.propertyTypeId?.value ?+filter.propertyTypeId?.value : null}
                            onChange={(e, select) =>
                                updateFilterByKey(String(e), "propertyTypeId")
                            }
                            filterOption={(input: string, option: any) =>
                                option?.children
                                    ?.toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            <Option value="">heç biri</Option>
                            {allPropertyType &&
                            allPropertyType.map((opt) => (
                                <Option key={opt.key} value={opt.key}>
                                    {opt.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </Col>

                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Blok</label>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            showSearch
                            placeholder="Blok seçin"
                            optionFilterProp="children"
                            value={filter.blockId?.value ?+filter.blockId?.value : null}
                            onChange={(e) =>
                                updateFilterByKey(String(e), "blockId")
                            }
                            filterOption={(input: string, option: any) =>
                                option?.children
                                    ?.toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {" "}
                            <Option value="">heç biri</Option>
                            {allBlock?.map((opt: BlockRes) => (
                                <Option key={opt.key} value={opt.key}>
                                    {opt.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Şəhər</label>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            showSearch
                            placeholder="Şəhər seçin"
                            optionFilterProp="children"
                            value={filter.cityId?.value ?+filter.cityId?.value : null}
                            onChange={(e) =>
                                updateFilterByKey(String(e), "cityId")
                            }
                            filterOption={(input: string, option: any) =>
                                option?.children
                                    ?.toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {" "}
                            <Option value="">heç biri</Option>
                            {allCity?.map((opt: BlockRes) => (
                                <Option key={opt.key} value={opt.key}>
                                    {opt.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Rayon</label>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            showSearch
                            placeholder="Rayon seçin"
                            optionFilterProp="children"
                            value={filter.stateId?.value ?+filter.stateId?.value : null}
                            onChange={(e) =>
                                updateFilterByKey(String(e), "stateId")
                            }
                            filterOption={(input: string, option: any) =>
                                option?.children
                                    ?.toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {" "}
                            <Option value="">heç biri</Option>
                            {allState?.map((opt: BlockRes) => (
                                <Option key={opt.key} value={opt.key}>
                                    {opt.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Metro</label>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            showSearch
                            placeholder="Metro seçin"
                            optionFilterProp="children"
                            value={filter.metroId?.value ?+filter.metroId?.value : null}
                            onChange={(e) =>
                                updateFilterByKey(String(e), "metroId")
                            }
                            filterOption={(input: string, option: any) =>
                                option?.children
                                    ?.toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {" "}
                            <Option value="">heç biri</Option>
                            {allMetro?.map((opt: BlockRes) => (
                                <Option key={opt.key} value={opt.key}>
                                    {opt.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Mərtəbə</label>
                        <Select
                            style={{
                                width: "100%",
                            }}
                            showSearch
                            placeholder="Mərtəbə seçin"
                            optionFilterProp="children"
                            value={filter.floorId?.value ?+filter.floorId?.value : null}
                            onChange={(e) =>
                                updateFilterByKey(String(e), "floorId")
                            }
                            filterOption={(input: string, option: any) =>
                                option?.children
                                    ?.toLowerCase()
                                    .includes(input.toLowerCase())
                            }
                        >
                            {" "}
                            <Option value="">heç biri</Option>
                            {allFloor &&
                            allFloor.map((opt: FloorRes) => (
                                <Option key={opt.key} value={opt.key}>
                                    {opt.name}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Status</label>
                        <Slider
                            tooltip={{ open: false }}
                            marks={statusMarks}
                            step={null}
                            value={
                                filter.rentStatus?.value === "true"
                                    ? 50
                                    : filter.rentStatus?.value === "false"
                                        ? 100
                                        : 0
                            }
                            onChange={(value) => {
                                if (value === 50) {
                                    updateFilterByKey("true", "rentStatus")
                                } else if (value === 100) {
                                    updateFilterByKey("false", "rentStatus")
                                } else {
                                    updateFilterByKey("", "rentStatus")
                                }
                            }}
                        />
                    </div>
                </Col>
                <Col xs={12} md={6}>
                    <div>
                        <label className="m-r-1">Təmir</label>
                        <Slider
                            tooltip={{ open: false }}
                            marks={repairMarks}
                            step={null}
                            value={
                                filter.isRepair?.value === "true"
                                    ? 50
                                    : filter.isRepair?.value === "false"
                                        ? 100
                                        : 0
                            }
                            onChange={(value) => {
                                if (value === 50) {
                                    updateFilterByKey("true", "isRepair")
                                } else if (value === 100) {
                                    updateFilterByKey("false", "isRepair")
                                } else {
                                    updateFilterByKey("", "isRepair")
                                }
                            }}
                        />
                    </div>
                </Col>
                <Col xs={24} md={3}>
                    <Button
                        disabled={
                            !(
                                filter.name?.value ||
                                filter.area?.value ||
                                filter.rentPrice?.value ||
                                filter.rentStatus?.value ||
                                filter.propertyTypeId?.value ||
                                filter.blockId?.value ||
                                filter.cityId?.value ||
                                filter.stateId?.value ||
                                filter.metroId?.value ||
                                filter.floorId?.value ||
                                filter.roomId?.value ||
                                filter.isRepair?.value
                            )
                        }
                        className="btn btn-round btn-block btn-warning lift "
                        style={{
                            padding: "0.2rem 0.75rem",
                            fontWeight: "500",
                            width: "95%",
                            marginTop: "15px",
                        }}
                        onClick={onFilterData}
                    >
                        Təsdiqlə
                    </Button>
                </Col>
                <Col xs={24} md={3}>
                    <Button
                        // disabled={
                        //     name?.value ||
                        //     projectName?.value ||
                        //     propertyTypeName?.value ||
                        //     salesPrice?.value ||
                        //     rentPrice?.value ||
                        //     salesStatus?.value ||
                        //     rentStatus?.value ||
                        //     block?.value ||
                        //     floor?.value ||
                        //     room?.value ||
                        //     communalActive?.value
                        //         ? false
                        //         : !location.state
                        // }
                        className="btn btn-round btn-block  lift btn-disable-block"
                        style={{
                            padding: "0.2rem 0.75rem",
                            fontWeight: "500",
                            width: "95%",
                            marginTop: "15px",
                        }}
                        onClick={onRefleshFilter}
                    >
                        Filteri sıfırla
                    </Button>
                </Col>
            </Row>
        </>
    );
};

export default PropertyFilter;
