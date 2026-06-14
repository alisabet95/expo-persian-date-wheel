import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
import moment from "moment-jalaali";

// Configure moment-jalaali
moment.loadPersian();

// Convert English numbers to Persian (Farsi) numbers
const toPersianNumbers = (text: string | number): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return String(text).replace(/\d/g, (d) => persianDigits[parseInt(d)]);
};

// Theme variants
const variants = {
  adeleh: {
    background: "#FFFFFF",
    surface: "#FFFFFF",
    primary: "#6366F1",
    text: "#1F2937",
    textSecondary: "#6B7280",
    border: "#E5E7EB",
    selectedBackground: "#E0E7FF",
    isDark: false,
  },
  atlas: {
    background: "#1E1E2E",
    surface: "#2D2D3D",
    primary: "#F59E0B",
    text: "#F3F4F6",
    textSecondary: "#9CA3AF",
    border: "#4B5563",
    selectedBackground: "#78350F",
    isDark: true,
  },
  shadi: {
    background: "#0F172A",
    surface: "#1E293B",
    primary: "#EC4899",
    text: "#F8FAFC",
    textSecondary: "#94A3B8",
    border: "#334155",
    selectedBackground: "#831843",
    isDark: true,
  },
  esi: {
    background: "#FDF4FF",
    surface: "#FFFFFF",
    primary: "#8B5CF6",
    text: "#2D1B4E",
    textSecondary: "#7C3AED",
    border: "#E9D5FF",
    selectedBackground: "#F3E8FF",
    isDark: false,
  },
};

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
  usePersianNumbers?: boolean; // New prop to toggle Persian numbers
}

export default function PersianDateWheel({
  visible,
  value = Date.now(),
  onConfirm,
  onCancel,
  showTime = false,
  variant = "atlas",
  minYear = 1320,
  maxYear = 1440,
  title,
  cancelText,
  confirmText,
  showNowButton = false,
  nowButtonText,
  fontFamily = Platform.OS === "ios" ? "System" : "sans-serif",
  usePersianNumbers = true, // Default to true for Persian numbers
}: PersianDateWheelProps) {
  const theme = variants[variant];
  const colors = theme;

  const texts = {
    cancel: cancelText || "انصراف",
    confirm: confirmText || "تأیید",
    title: title || "انتخاب تاریخ",
    year: "سال",
    month: "ماه",
    day: "روز",
    hour: "ساعت",
    minute: "دقیقه",
  };

  const t = texts;
  const nowText = nowButtonText || "اکنون";
  // Create a helper function for two-digit numbers
  const formatTwoDigitNumber = (num: number): string => {
    const twoDigit = num.toString().padStart(2, "0");
    return usePersianNumbers ? toPersianNumbers(twoDigit) : twoDigit;
  };

  const m = moment(value);
  const [selectedYear, setSelectedYear] = useState(m.jYear());
  const [selectedMonth, setSelectedMonth] = useState(m.jMonth() + 1);
  const [selectedDay, setSelectedDay] = useState(m.jDate());
  const [selectedHour, setSelectedHour] = useState(m.hour());
  const [selectedMinute, setSelectedMinute] = useState(m.minute());

  // Refs for scrolling
  const yearScrollRef = useRef<ScrollView>(null);
  const monthScrollRef = useRef<ScrollView>(null);
  const dayScrollRef = useRef<ScrollView>(null);
  const hourScrollRef = useRef<ScrollView>(null);
  const minuteScrollRef = useRef<ScrollView>(null);

  const handleSetToNow = () => {
    const now = moment();
    setSelectedYear(now.jYear());
    setSelectedMonth(now.jMonth() + 1);
    setSelectedDay(now.jDate());
    setSelectedHour(now.hour());
    setSelectedMinute(now.minute());
  };

  const years = Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i,
  );

  const months = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  const getDaysInMonth = (year: number, month: number) => {
    if (month <= 6) return 31;
    if (month <= 11) return 30;
    return moment(`${year}/12/01`, "jYYYY/jMM/jDD").isLeapYear() ? 30 : 29;
  };

  const days = Array.from(
    { length: getDaysInMonth(selectedYear, selectedMonth) },
    (_, i) => i + 1,
  );
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = Array.from({ length: 60 }, (_, i) => i);

  // Format number with Persian digits if enabled
  const formatNumber = (num: number): string => {
    const str = String(num);
    return usePersianNumbers ? toPersianNumbers(str) : str;
  };

  // Auto-scroll effect
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        const yearIndex = years.findIndex((y) => y === selectedYear);
        const monthIndex = selectedMonth - 1;
        const dayIndex = selectedDay - 1;
        const hourIndex = selectedHour;
        const minuteIndex = selectedMinute;

        if (yearScrollRef.current && yearIndex >= 0) {
          yearScrollRef.current.scrollTo({ y: yearIndex * 44, animated: true });
        }
        if (monthScrollRef.current && monthIndex >= 0) {
          monthScrollRef.current.scrollTo({
            y: monthIndex * 44,
            animated: true,
          });
        }
        if (dayScrollRef.current && dayIndex >= 0) {
          dayScrollRef.current.scrollTo({ y: dayIndex * 44, animated: true });
        }
        if (hourScrollRef.current && hourIndex >= 0) {
          hourScrollRef.current.scrollTo({ y: hourIndex * 44, animated: true });
        }
        if (minuteScrollRef.current && minuteIndex >= 0) {
          minuteScrollRef.current.scrollTo({
            y: minuteIndex * 44,
            animated: true,
          });
        }
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [
    visible,
    selectedYear,
    selectedMonth,
    selectedDay,
    selectedHour,
    selectedMinute,
  ]);

  useEffect(() => {
    const maxDay = getDaysInMonth(selectedYear, selectedMonth);
    if (selectedDay > maxDay) {
      setSelectedDay(maxDay);
    }
  }, [selectedYear, selectedMonth]);

  const handleConfirm = () => {
    const date = moment(
      `${selectedYear}/${selectedMonth}/${selectedDay}`,
      "jYYYY/jM/jD",
    )
      .hour(selectedHour)
      .minute(selectedMinute)
      .second(0);
    onConfirm(date.valueOf());
  };

  const PickerItem = ({ label, isSelected, onPress }: any) => (
    <TouchableOpacity
      style={[
        styles.pickerItem,
        isSelected && { backgroundColor: `${colors.primary}20` },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.pickerItemText,
          {
            color: isSelected ? colors.primary : colors.text,
            fontFamily: fontFamily,
            fontWeight: isSelected ? "600" : "400",
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={[styles.container, { backgroundColor: colors.surface }]}>
          <View style={[styles.header, { borderBottomColor: colors.border }]}>
            <TouchableOpacity
              onPress={onCancel}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text
                style={[
                  styles.cancelText,
                  { color: colors.textSecondary, fontFamily },
                ]}
              >
                {t.cancel}
              </Text>
            </TouchableOpacity>

            {showNowButton && (
              <TouchableOpacity
                onPress={handleSetToNow}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                style={styles.nowButton}
              >
                <Text
                  style={[
                    styles.nowButtonText,
                    { color: colors.primary, fontFamily, fontWeight: "500" },
                  ]}
                >
                  {nowText}
                </Text>
              </TouchableOpacity>
            )}

            <Text
              style={[
                styles.title,
                { color: colors.text, fontFamily, fontWeight: "600" },
              ]}
            >
              {t.title}
            </Text>

            <TouchableOpacity
              onPress={handleConfirm}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Text
                style={[
                  styles.confirmText,
                  { color: colors.primary, fontFamily, fontWeight: "600" },
                ]}
              >
                {t.confirm}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.pickersContainer, styles.pickersContainerRTL]}>
            {/* Year Picker */}
            <View style={styles.pickerColumn}>
              <Text
                style={[
                  styles.pickerLabel,
                  { color: colors.textSecondary, fontFamily },
                ]}
              >
                {t.year}
              </Text>
              <ScrollView
                ref={yearScrollRef}
                showsVerticalScrollIndicator={false}
                style={styles.pickerScroll}
              >
                {years.map((year) => (
                  <PickerItem
                    key={year}
                    label={formatNumber(year)}
                    isSelected={selectedYear === year}
                    onPress={() => setSelectedYear(year)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Month Picker */}
            <View style={styles.pickerColumn}>
              <Text
                style={[
                  styles.pickerLabel,
                  { color: colors.textSecondary, fontFamily },
                ]}
              >
                {t.month}
              </Text>
              <ScrollView
                ref={monthScrollRef}
                showsVerticalScrollIndicator={false}
                style={styles.pickerScroll}
              >
                {months.map((month, index) => (
                  <PickerItem
                    key={index}
                    label={month}
                    isSelected={selectedMonth === index + 1}
                    onPress={() => setSelectedMonth(index + 1)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Day Picker */}
            <View style={styles.pickerColumn}>
              <Text
                style={[
                  styles.pickerLabel,
                  { color: colors.textSecondary, fontFamily },
                ]}
              >
                {t.day}
              </Text>
              <ScrollView
                ref={dayScrollRef}
                showsVerticalScrollIndicator={false}
                style={styles.pickerScroll}
              >
                {days.map((day) => (
                  <PickerItem
                    key={day}
                    label={formatNumber(day)}
                    isSelected={selectedDay === day}
                    onPress={() => setSelectedDay(day)}
                  />
                ))}
              </ScrollView>
            </View>

            {/* Hour Picker */}
            {showTime && (
              <View style={styles.pickerColumn}>
                <Text
                  style={[
                    styles.pickerLabel,
                    { color: colors.textSecondary, fontFamily },
                  ]}
                >
                  {t.hour}
                </Text>
                <ScrollView
                  ref={hourScrollRef}
                  showsVerticalScrollIndicator={false}
                  style={styles.pickerScroll}
                >
                  {hours.map((hour) => (
                    <PickerItem
                      key={hour}
                      label={formatTwoDigitNumber(hour)} // Will show ۰۱, ۰۲, etc.
                      isSelected={selectedHour === hour}
                      onPress={() => setSelectedHour(hour)}
                    />
                  ))}
                </ScrollView>
              </View>
            )}

            {/* Minute Picker */}
            {showTime && (
              <View style={styles.pickerColumn}>
                <Text
                  style={[
                    styles.pickerLabel,
                    { color: colors.textSecondary, fontFamily },
                  ]}
                >
                  {t.minute}
                </Text>
                <ScrollView
                  ref={minuteScrollRef}
                  showsVerticalScrollIndicator={false}
                  style={styles.pickerScroll}
                >
                  {minutes.map((minute) => (
                    <PickerItem
                      key={minute}
                      label={formatTwoDigitNumber(minute)} // Will show ۰۱, ۰۲, etc.
                      isSelected={selectedMinute === minute}
                      onPress={() => setSelectedMinute(minute)}
                    />
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  nowButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  nowButtonText: {
    fontSize: 14,
  },
  cancelText: {
    fontSize: 16,
  },
  title: {
    fontSize: 18,
  },
  confirmText: {
    fontSize: 16,
  },
  pickersContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  pickersContainerRTL: {
    flexDirection: "row-reverse",
  },
  pickerColumn: {
    flex: 1,
    height: 250,
  },
  pickerScroll: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 8,
    opacity: 0.8,
  },
  pickerItem: {
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    height: 44,
  },
  pickerItemText: {
    fontSize: 14,
    textAlign: "center",
  },
});
