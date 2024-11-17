import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { COLORS, SIZES } from "../../../constants";

const Menu = () => {
  const params = useLocalSearchParams();
  const [menus, setMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Track expanded state for each category
  const [expandedCategories, setExpandedCategories] = useState({});

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    setIsLoading(true);
    try {
      const request = await fetch(
        `http://localhost:3000/menu/restaurant/${params.id}`
      );
      const response = await request.json();
      const fetchedMenus = response?.restaurantMenu[0]?.menuItems ?? [];

      // Set initial expanded state for the first category
      if (fetchedMenus.length > 0) {
        setExpandedCategories({ [fetchedMenus[0].categoryName]: true });
      }

      setMenus(fetchedMenus);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError("Error while loading menu!");
    }
  };

  const toggleCategory = (categoryName) => {
    setExpandedCategories((prevState) => ({
      ...prevState,
      [categoryName]: !prevState[categoryName],
    }));
  };

  if (isLoading || menus.length === 0) {
    return null;
  }

  return (
    <View style={{ marginTop: 8 }}>
      <Text variant="titleMedium" style={{ fontSize: SIZES.large }}>
        Menu
      </Text>

      {menus.map((menu, idx) => (
        <Card
          key={idx}
          mode="elevated"
          style={{
            marginTop: 16,
            backgroundColor: COLORS.lightWhite,
          }}
        >
          {/* Category Header */}
          <TouchableWithoutFeedback
            onPress={() => toggleCategory(menu.categoryName)}
          >
            <View
              style={{
                padding: 16,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: 12,
              }}
            >
              <Text variant="titleSmall" style={{ fontWeight: "bold" }}>
                {menu.categoryName}
              </Text>
              <Text>{expandedCategories[menu.categoryName] ? "-" : "+"}</Text>
            </View>
          </TouchableWithoutFeedback>
          {expandedCategories[menu.categoryName] && (
            <Card.Content>
              {/* Category Items */}
              {menu.categoryItems.map((item, itemIdx) => (
                <Card
                  key={itemIdx}
                  mode="outlined"
                  style={{
                    margin: 8,
                    backgroundColor: COLORS.lightWhite,
                    borderColor: "rgba(0, 0, 0, 0.12)",
                  }}
                >
                  <Card.Title
                    title={item.name}
                    subtitle={item.price}
                    left={() => (
                      <Image
                        source={{
                          uri: item.image,
                        }}
                        resizeMode="cover"
                        style={{ width: 40, height: 40, borderRadius: 50 }}
                      />
                    )}
                  />
                  <Card.Content>
                    <Text variant="bodyMedium">{item.description}</Text>
                  </Card.Content>
                </Card>
              ))}
            </Card.Content>
          )}
        </Card>
      ))}
    </View>
  );
};

export default Menu;
