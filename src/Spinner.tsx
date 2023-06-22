import './Spinner.css';


export function Spinner({size, color}:SpinnerProps) {
    return (
        <svg width={size} height={size} stroke={color} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <g className="spinner_V8m1">
                <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="3"></circle>
            </g>
        </svg>
    )
}

interface SpinnerProps {
    size: string;
    color: string;
}