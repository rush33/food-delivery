import { useRef, useMemo, useEffect, useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
  Pressable,
  Alert,
} from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { FontAwesome5, Fontisto } from "@expo/vector-icons";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { Entypo, MaterialIcons, Ionicons } from "@expo/vector-icons";
import MapViewDirections from "react-native-maps-directions";
import { useNavigation } from "@react-navigation/native";
import {
  updateDoc,
  doc,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import Config from "react-native-config";
import DishInfo from "../../components/DishInfo";
import styles from "./styles.js";

const OrderDelivery = ({ route }) => {
  const { order } = route.params;
  const [driverLocation, setDriverLocation] = useState(null);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalKm, setTotalKm] = useState(0);
  const [dishInfo, setDishInfo] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState("READY");
  const navigation = useNavigation();

  const bottomSheetRef = useRef(null);
  const { width, height } = useWindowDimensions();
  const snapPoints = useMemo(() => ["12%", "95%"], []);
  const mapRef = useRef(null);

  const restaurantLocation = {
    latitude: order.restaurantLatitude,
    longitude: order.restaurantLongitude,
  };
  const deliveryLocation = {
    latitude: order.userLatitude,
    longitude: order.userLongitude,
  };

  // const STATUS = {
  //   READY_FOR_PICKUP: "READY_FOR_PICKUP",
  //   ACCEPTED: "DRIVERACCEPTED",
  //   PICKED_UP: "DRIVERPICKEDUP",
  //   COMPLETE: "COMPLETE",
  // };

  useEffect(() => {
    getDriverLocation();
    getDishId();

    let foregroundSubscription;
    (async () => {
      try {
        foregroundSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            distanceInterval: 100,
          },
          (updatedLocation) => {
            setDriverLocation({
              latitude: updatedLocation.coords.latitude,
              longitude: updatedLocation.coords.longitude,
            });
          }
        );
      } catch (e) {
        console.log(e);
      }
    })();

    const orderRef = doc(db, "orders", order.id);
    updateDoc(orderRef, {
      status: deliveryStatus,
    });

    return () => {
      if (foregroundSubscription) {
        foregroundSubscription.remove();
      }
    };
  }, [deliveryStatus]);

  const getDriverLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (!status === "granted") {
      console.log("Nonono");
      return;
    }

    let location = await Location.getCurrentPositionAsync();
    setDriverLocation({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const getDishId = async () => {
    const dishesRef = collection(db, "orderDishes");
    const q = query(dishesRef, where("orderId", "==", order.id));

    await getDocs(q).then((querySnapshot) => {
      let items = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data() });
      });
      setDishInfo(items);
    });
  };

  console.log(dishInfo);

  if (!driverLocation) {
    return <ActivityIndicator size={"large"} />;
  }

  const renderButtonTitle = () => {
    if (deliveryStatus === "READY") {
      return "Accept Order ✅";
    }
    if (deliveryStatus === "DRIVERACCEPTED") {
      return "Pick-Up Order 🛵";
    }
    if (deliveryStatus === "DRIVERPICKEDUP") {
      return "Payment Received 💵";
    }
    if (deliveryStatus === "COMPLETE") {
      return "Complete Delivery 🎉";
    }
  };
  console.log(deliveryStatus);
  const onButtonpressed = () => {
    if (deliveryStatus === "READY") {
      bottomSheetRef.current?.collapse();
      mapRef.current.animateToRegion({
        latitude: driverLocation.latitude,
        longitude: driverLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setDeliveryStatus("DRIVERACCEPTED");
    }
    if (deliveryStatus === "DRIVERACCEPTED") {
      bottomSheetRef.current?.collapse();
      setDeliveryStatus("DRIVERPICKEDUP");
    }
    if (deliveryStatus === "DRIVERPICKEDUP") {
      bottomSheetRef.current?.collapse();
      setDeliveryStatus("COMPLETE");
    }
    if (deliveryStatus === "COMPLETE") {
      bottomSheetRef.current?.collapse();
      setDeliveryStatus("COMPLETE");
      navigation.goBack();
      Alert.alert(
        "Order Delivered 🎉",
        "You delivered the order successfully!",
        [
          {
            text: "OK",
          },
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={{ width, height }}
        provider="google"
        showsUserLocation
        followsUserLocation
        initialRegion={{
          latitude: driverLocation.latitude,
          longitude: driverLocation.longitude,
          latitudeDelta: 0.07,
          longitudeDelta: 0.07,
        }}
      >
        <MapViewDirections
          origin={driverLocation}
          destination={
            deliveryStatus === "DRIVERACCEPTED"
              ? restaurantLocation
              : deliveryLocation
          }
          strokeWidth={5}
          waypoints={deliveryStatus === "READY" ? [restaurantLocation] : []}
          strokeColor="green"
          apikey="AIzaSyCi-MWuhMrs1DfJqTycPWS8N9KorPuAs-0"
          onReady={(result) => {
            // setIsDriverClose(result.distance <= 0.1);
            setTotalMinutes(result.duration);
            setTotalKm(result.distance);
          }}
        />
        <Marker
          coordinate={{
            latitude: order.restaurantLatitude,
            longitude: order.restaurantLongitude,
          }}
          title={order.restaurantName}
          description={order.restaurantAddress}
        >
          <View
            style={{ backgroundColor: "green", padding: 5, borderRadius: 20 }}
          >
            <MaterialIcons name="restaurant" size={30} color="white" />
          </View>
        </Marker>

        <Marker
          coordinate={{
            latitude: order.userLatitude,
            longitude: order.userLongitude,
          }}
          title={order.UserName}
          // description={order.User.address}
        >
          <View
            style={{ backgroundColor: "green", padding: 7, borderRadius: 20 }}
          >
            <FontAwesome5 name="user" size={28} color="white" />
          </View>
        </Marker>
      </MapView>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <View style={styles.handleIndicatorContainer}>
          <Text style={styles.routeDetailsText}>
            {totalMinutes.toFixed(0)} min
          </Text>
          <FontAwesome5
            name="shopping-bag"
            size={30}
            color="#3FC060"
            style={{ marginHorizontal: 10 }}
          />
          <Text style={styles.routeDetailsText}>{totalKm.toFixed(2)} km</Text>
        </View>
        <View style={styles.deliveryDetailsContainer}>
          <Text style={styles.restaurantName}>{order.restaurantName}</Text>
          <View style={styles.adressContainer}>
            <Fontisto name="shopping-store" size={22} color="grey" />
            <Text style={styles.adressText}>{order.restaurantAddress}</Text>
          </View>

          <View style={styles.adressContainer}>
            <FontAwesome5 name="user" size={28} color="grey" />
            <Text style={styles.adressText}>
              {order.userFirstName} {order.userLastName}
            </Text>
          </View>

          <View style={styles.adressContainer}>
            <FontAwesome5 name="map-marker-alt" size={30} color="grey" />
            <Text style={styles.adressText}>{order.userAddress}</Text>
          </View>

          <View style={styles.orderDetailsContainer}>
            {dishInfo.map((item, index) => {
              return (
                <DishInfo
                  key={index}
                  id={item.dishId}
                  quantity={item.quantity}
                />
              );
            })}
          </View>
        </View>

        {deliveryStatus === "READY" && (
          <Pressable
            style={{
              ...styles.buttonContainer,
              backgroundColor: "#000",
              position: "absolute",
              bottom: 80,
              width: "95%",
            }}
            onPress={() => navigation.navigate("OrdersScreen")}
          >
            <Text style={styles.buttonText}>Back</Text>
          </Pressable>
        )}

        <Pressable
          style={{
            ...styles.buttonContainer,
            backgroundColor: "#3FC060",
          }}
          onPress={onButtonpressed}
        >
          <Text style={styles.buttonText}>{renderButtonTitle()}</Text>
        </Pressable>
      </BottomSheet>
    </View>
  );
};

export default OrderDelivery;
