// FilterComponent.js
import React, { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { ThemeContext } from "../context/ThemeContext";

const FilterComponent = ({ initialSelectedCategory = "", onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    initialSelectedCategory
  );
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);

  const taskTypes = [
    { label: "Family", value: "Family", icon: "account-group" },
    { label: "Lesson", value: "Lesson", icon: "school" },
    { label: "Job", value: "Job", icon: "briefcase" },
    { label: "Shopping ", value: "Shopping", icon: "cart" },
    { label: "Exercise ", value: "Exercise ", icon: "dumbbell" },
    { label: "Medical", value: "Medical", icon: "hospital" },
    { label: "Other", value: "Other", icon: "dots-horizontal" },
  ];

  const selectCategory = (category) => {
    setSelectedCategory(category);
    onSelect(category);
  };

  return (
    <View style={theme.containerFilterComponent}>
      {taskTypes.map((item) => (
        <TouchableOpacity
          key={item.value}
          numColumns={2}
          style={[
            theme.typeContainer,
            {
              backgroundColor:
                selectedCategory === item.value ? "#FF8878" : "gray",
            },
          ]}
          onPress={() => selectCategory(item.value)}
        >
          <IconButton icon={item.icon} size={30} color="white" />
          <Text style={theme.typeLabel}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default FilterComponent;
