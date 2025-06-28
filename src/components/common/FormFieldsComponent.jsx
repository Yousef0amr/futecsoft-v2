import React from 'react'
import { Col, Row } from 'react-bootstrap'
import InputField from './InputFiled'
import SelectMenu from './SelectMenu'
import CheckBox from './CheckBox'
import CustomInput from './CustomInput'
import { useAutoSyncField } from '../../hooks/useAutoSyncField'


const FormFieldsComponent = ({ handleModalClick, isLoading, selectedValue = [], fields, options, triggerEvent = () => { }, register, errors, watch, setValue }) => {

    const useAutoSyncFieldsMap = (setValue) => {
        return {
            NameAr: useAutoSyncField({
                sourceField: "NameAr",
                targetField: "NameEn",
                setValue,
            }),
            BranchNameAr: useAutoSyncField({
                sourceField: "BranchNameAr",
                targetField: "BranchNameEn",
                setValue,
            }),
            DiscountTypeAR: useAutoSyncField({
                sourceField: "DiscountTypeAR",
                targetField: "DiscountTypeEN",
                setValue,
            }),
            TaxAr: useAutoSyncField({
                sourceField: "TaxAr",
                targetField: "TaxEn",
                setValue,
            }),
            PaymentArDesc: useAutoSyncField({
                sourceField: "PaymentArDesc",
                targetField: "PaymentEnDesc",
                setValue,
            }),
            GroupArName: useAutoSyncField({
                sourceField: "GroupArName",
                targetField: "GroupEnName",
                setValue,
            }),
            Unit_AR: useAutoSyncField({
                sourceField: "Unit_AR",
                targetField: "Unit_EN",
                setValue,
            }),
        };
    };
    const syncHandlers = useAutoSyncFieldsMap(setValue);

    return (
        <Row style={{ marginTop: '10px' }}>
            {fields.map((field) => {
                const sync = syncHandlers[field.name];

                return <Col xs={12} md={6} key={field.name} style={{ marginBottom: '10px' }} >
                    {(field.type === 'text' || field.type === 'number' || field.type === 'email' || field.type === 'date' || field.type === 'password') &&
                        <InputField
                            name={field.name}
                            label={field.label}
                            onChange={sync?.onChange}
                            onBlur={sync?.onBlur}
                            register={register}
                            disabled={field.disabled}
                            errors={errors}
                            required={field.required}
                            type={field.type}
                            min={0}
                        />
                    }
                    {
                        field.type === 'select' && <SelectMenu
                            watch={watch}
                            onChange={(e) => {
                                setValue(field.name, e.target.value)
                                triggerEvent && triggerEvent(e.target.value, field.name)
                            }}
                            setValue={setValue}
                            errors={errors}
                            multiple={field.multiple}
                            name={field.name}
                            options={
                                options[field.name]
                            }
                            label={field.label}
                            required={field.required}
                            isLoading={isLoading}
                        />
                    }
                    {
                        field.type === 'check' &&
                        <div className='mt-4'>
                            <CheckBox
                                label={field.label}
                                isChecked={watch(field.name)}
                                onChange={(value) => setValue(field.name, value)}
                                required={field.required}
                            />
                        </div>

                    }
                    {
                        field.type === 'custom' && <CustomInput value={selectedValue?.find((item) => item.value === watch(field.name))?.label} name={field.name} handleModalClick={handleModalClick} label={field.label} required={field.required} />
                    }
                </Col>
            })}
        </Row>
    )
}

export default FormFieldsComponent
