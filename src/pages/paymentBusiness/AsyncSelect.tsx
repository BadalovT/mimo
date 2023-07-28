import { Button, Select, Spin } from 'antd';
import { useState } from 'react';
import axios from 'axios';


interface Option {
    value: string;
    label: string;
}

const AsyncSelect: React.FC = () => {
    const [options, setOptions] = useState<Option[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string | undefined>(undefined); // add state for selected value

    const handleSearch = async () => {
        setLoading(true);

        try {
            const response = await axios.get(`https://apitest.mimo.az/api/Contract/GetByContractNo/${searchValue}`);
            const data = response.data;

            const options = [{
                value: data.name,
                label: data.name,
            }];

            setOptions(options);
            setOpen(true);
        } catch (error) {
            console.error(error);
        }

        setLoading(false);
    };

    const handleInputChange = (value: string) => {
        value && setSearchValue(value);
    };

    const handleClear = () => {
        setSearchValue('');
        setOptions([]);
        setOpen(false);
        setValue(undefined);
    };

    const handleDropdownVisibleChange = (open: boolean) => {
        setOpen(open);
    };

    return (
        <>
            <Select
                showSearch
                loading={loading}
                onSearch={handleInputChange}
                options={options}
                open={open}
                onDropdownVisibleChange={handleDropdownVisibleChange}
                onBlur={() => setOpen(false)}
                filterOption={false}
                notFoundContent={loading ? <Spin size="small" /> : 'No options found'}
                style={{ width: 200 }}
                onChange={setValue}
                value={value}
            />
            <Button type="primary" onClick={handleSearch} style={{ marginRight: 8 }}>
                Axtar
            </Button>
            <Button onClick={handleClear}>Təmizlə</Button>
        </>
    );
};

export default AsyncSelect;
