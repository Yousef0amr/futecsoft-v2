import React from "react";
import Select, { components } from "react-select";
import { FixedSizeList as List } from "react-window";

const height = 30;

const MenuList = (props) => {
    const { options, children, maxHeight, getValue } = props;
    const [value] = getValue();
    const initialOffset =
        value && options.length > 0
            ? options.findIndex((opt) => opt.value === value.value) * height
            : 0;

    return (
        <components.MenuList {...props}>
            <List
                height={200}
                itemCount={children.length}
                itemSize={height}
                initialScrollOffset={initialOffset}
                width="100%"
            >
                {({ index, style }) => (
                    <div style={style} key={index}>
                        {children[index]}
                    </div>
                )}
            </List>
        </components.MenuList>
    );
};

const LazySelect = ({ options, selectedOption, setSelectedOption }) => (
    <div style={{ width: 500, height: 400 }}>
        <Select
            onChange={setSelectedOption}
            defaultValue={selectedOption}
            components={{ MenuList }}
            options={options}
            placeholder="اختر"
        />
    </div>
);

export default LazySelect;
