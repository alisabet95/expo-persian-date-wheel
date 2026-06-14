import React from "react";
export interface PersianDateWheelProps {
    visible: boolean;
    value?: number;
    onConfirm: (timestamp: number) => void;
    onCancel: () => void;
    showTime?: boolean;
    variant?: "atlas" | "adeleh" | "shadi" | "esi";
    minYear?: number;
    maxYear?: number;
    title?: string;
    cancelText?: string;
    confirmText?: string;
    showNowButton?: boolean;
    nowButtonText?: string;
    fontFamily?: string;
    usePersianNumbers?: boolean;
}
export default function PersianDateWheel({ visible, value, onConfirm, onCancel, showTime, variant, minYear, maxYear, title, cancelText, confirmText, showNowButton, nowButtonText, fontFamily, usePersianNumbers, }: PersianDateWheelProps): React.JSX.Element;
