import type { ReactNode } from "react";
import { memo, useMemo } from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

import { useTheme } from "@/hooks/useTheme";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    textAlign: "center",
    width: "100%",
  },
});

type CalendarRowMonthTheme = {
  container?: ViewStyle;
  content?: TextStyle;
};

export interface CalendarRowMonthProps {
  children: ReactNode;
  /**
   * The height of the month row, needed to correctly measure the calendar's
   * height.
   */
  height: number;
  /** The theme of the month row, useful for customizing the component. */
  theme?: CalendarRowMonthTheme;
}

export const CalendarRowMonth = memo(
  ({ children, height, theme }: CalendarRowMonthProps) => {
    const baseTheme = useTheme();
    const { containerStyles, contentStyles } = useMemo(() => {
      const containerStyles = [styles.container, { height }, theme?.container];
      const contentStyles = [
        styles.content,
        { color: baseTheme.colors.content.primary },
        theme?.content,
      ];
      return { containerStyles, contentStyles };
    }, [
      baseTheme.colors.content.primary,
      height,
      theme?.container,
      theme?.content,
    ]);

    return (
      <View style={containerStyles}>
        <Text style={contentStyles}>{children}</Text>
      </View>
    );
  }
);
