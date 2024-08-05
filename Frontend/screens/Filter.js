import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ThemeContext } from "../context/ThemeContext";
import { BackHandler } from "react-native";

const Filter = () => {
  const navigation = useNavigation();
  const { isDarkTheme, toggleTheme, theme } = useContext(ThemeContext);
  const route = useRoute();
  const { selectedCategories: initialSelectedCategories, onSave } =
    route.params;

  const [selectedCategories, setSelectedCategories] = useState(
    initialSelectedCategories
  );

  const taskTypes = [
    { label: "Family", value: "Family", icon: "account-group" },
    { label: "Lesson", value: "Lesson", icon: "school" },
    { label: "Job", value: "Job", icon: "briefcase" },
    { label: "Shopping ", value: "Shopping", icon: "cart" },
    { label: "Exercise ", value: "Exercise", icon: "dumbbell" },
    { label: "Medical", value: "Medical", icon: "hospital" },
    { label: "Other", value: "Other", icon: "dots-horizontal" },
  ];

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((item) => item !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  React.useEffect(() => {
    const backAction = () => {
      navigation.navigate("Tasks");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  const handleSave = () => {
    onSave(selectedCategories);
    navigation.navigate("Tasks");
  };

  return (
    <View style={theme.containerFilter}>
      <FlatList
        data={taskTypes}
        numColumns={2}
        keyExtractor={(item) => item.value}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              theme.typeContainer,
              {
                backgroundColor: selectedCategories.includes(item.value)
                  ? theme.typeContainerColorSelected
                  : theme.typeContainerColorDefault,
              },
            ]}
            onPress={() => toggleCategory(item.value)}
          >
            <IconButton icon={item.icon} size={30} color="white" />
            <Text style={theme.typeLabel}>{item.label}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={theme.applyButton} onPress={handleSave}>
        <Text style={theme.applyButtonText}>Apply Filters</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Filter;
