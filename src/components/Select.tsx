import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'



export function Select({
    label,
    currencies,
    onSelect
}: FormFieldProps) {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>("Select a currency");
    const [options, setOptions] = useState<ApiCurrency[]>(currencies);

    const handleOptionClick = (code: string, name: string) => {
        setSelectedOption(`${code} - ${name}`);
        setDropdownOpen(!dropdownOpen);
        onSelect(code, name, label);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filteredOptions = currencies.filter(opt => 
            opt.ISOCurrencyCode.toLowerCase().includes(e.target.value.toLowerCase()) || opt.CurrencyEnglishName.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setOptions(filteredOptions);
    }

    useEffect(() => {
        setOptions(currencies);
    }, [currencies])

    return (
        <div className="input-group">
            <label htmlFor={label}>{label}</label>
            <div className="select"  id={label}  >
                <div className="select-head" >
                    {
                        !dropdownOpen ? 
                            <div className="select-display" onClick={() => setDropdownOpen(!dropdownOpen)}>{selectedOption}</div> 
                            : 
                            <input className="select-input" placeholder="Type to search"
                                onChange={(e) => handleInputChange(e)}
                            /> 
                    }
                    <div className="select-button" onClick={() => {setDropdownOpen(!dropdownOpen); setOptions(currencies)}} >
                        {(!dropdownOpen) ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleUp} />}
                    </div>
                </div>
                {
                    dropdownOpen && (
                        <div className="dropdown" >
                            {   
                                options.length === 0 ?
                                    <div className="no-option">No results available</div>
                                    :
                                    options.map((c: ApiCurrency) => (
                                        <div
                                            className="option"
                                            key={c.ISOCurrencyCode}
                                            onClick={() => handleOptionClick(c.ISOCurrencyCode, c.CurrencyEnglishName)}
                                        >
                                            {c.ISOCurrencyCode} - {c.CurrencyEnglishName}
                                        </div>
                                    ))
                            }
                        </div>
                    )
                }  
            </div>
        </div>
    )
}

interface FormFieldProps {
    label: string;
    currencies: ApiCurrency[];
    onSelect: Function;
}

export interface ApiCurrency {
    ISOCurrencyCode: string,
    CurrencySymbol: string,
    CurrencyEnglishName: string,
    CountryName: string,
    CountryThreeLetterCode: string,
    CountryISOTwoLetterCode: string,
    IsEuropeanUnionMember: boolean
  }

