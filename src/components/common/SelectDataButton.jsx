

const SelectDataButton = ({ name, selectData, params, selectedData }) => {
    return (
        <div className="d-flex gap-2">
            <div >
                <button
                    type='button'
                    style={{ color: 'var(--text-color)' }}
                    className="button-danger bg-transparent border-0"
                    onClick={() => selectData(params)}
                >
                    {selectedData || name}
                </button>
            </div>
        </div>
    )
}

export default SelectDataButton
