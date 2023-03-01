import React, { useState } from 'react';


export function Select({
    label,
    currencies
}: FormFieldProps) {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<ApiCurrency | string>("Select a currency");

    const handleOptionClick = (code: string, name: string) => {
        setSelectedOption(`${code} - ${name}`);
        setDropdownOpen(!dropdownOpen)
    }

    return (
        <div className="input-group">
            <label htmlFor={label}>{label}</label>
            <div className="select"  id={label} onClick={e => setDropdownOpen(!dropdownOpen)}>
                <div className="select-display">{`${selectedOption}`}</div>
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

