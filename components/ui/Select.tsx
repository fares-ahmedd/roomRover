interface SelectProps {
  label: string;
  optionLabel: string;
  value?: string;
  disabled?: boolean;
  defaultValue?: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}

function Select({
  label,
  value,
  id,
  onChange,
  optionLabel,
  disabled,
  defaultValue,
  children,
}: SelectProps) {
  return (
    <>
      <label htmlFor={id} className="mt-1 text-sm text-sec-text">
        {label}
      </label>
      <select
        className="py-2  bg-sec-background px-4 w-full  border rounded-md font-bold disabled:opacity-35 "
        value={value}
        onChange={onChange}
        id={id}
        disabled={disabled}
        defaultValue={defaultValue}
      >
        <option disabled value="">
          {optionLabel}
        </option>
        {children}
      </select>
    </>
  );
}

export default Select;
