import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'



export function Select({
    label,
    currencies,
    onSelect
}: FormFieldProps) {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>("Select a currency");

    const handleOptionClick = (code: string, name: string) => {
        setSelectedOption(`${code} - ${name}`);
        setDropdownOpen(!dropdownOpen);
        onSelect(code, label);
    }

    return (
        <div className="input-group">
            <label htmlFor={label}>{label}</label>
            <div className="select"  id={label} onClick={e => setDropdownOpen(!dropdownOpen)}>
                <div className="select-display">{`${selectedOption}`}</div>
                <div>
                    {(!dropdownOpen) ? <FontAwesomeIcon icon={faAngleDown} /> : <FontAwesomeIcon icon={faAngleUp} />}
                </div>
                {
                    dropdownOpen && (
                        <div className="dropdown" >
                            { currencies.map((c: ApiCurrency) => (
                                <div
                                    className="option"
                                    key={c.ISOCurrencyCode}
                                    onClick={() => handleOptionClick(c.ISOCurrencyCode, c.CurrencyEnglishName)}
                                >
                                    {c.ISOCurrencyCode} - {c.CurrencyEnglishName}
                                </div>
                            ))}
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

