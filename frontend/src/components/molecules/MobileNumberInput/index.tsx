import PhoneInput, { CountryData } from 'react-phone-input-2';
import './index.css';
interface MobileNumberInputProps{
  label?:string,
  defaultCountry?:string,
  onChange?:(value: string,
    data: {} | CountryData,
    event: React.ChangeEvent<HTMLInputElement>, formattedValue: string)=>void,
  style?:React.CSSProperties
};

  const MobileNumberInput = (props:MobileNumberInputProps)=>{
    const {label,defaultCountry,onChange,style} = props;

    return (
      <div 
      data-testid="phone-num-input">
      <PhoneInput
          specialLabel={label}
          country={defaultCountry}
          onChange={onChange}
          inputStyle={style}
          buttonStyle={{borderRadius:"100%"}}
        />
        </div>
        
    );

};

export default MobileNumberInput;
