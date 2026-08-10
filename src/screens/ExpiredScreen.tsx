import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Linking from "expo-linking";
import { formatExpiryDate } from "@/utils/dateUtils";

interface ExpiredScreenProps {
  expiryTime: string;
  contactNumber: string;
}

export function ExpiredScreen({ expiryTime, contactNumber }: ExpiredScreenProps) {
  const handleContact = () => {
    Linking.openURL(`tel:${contactNumber.replace(/\s/g, "")}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Application Expired</Text>
      <Text style={styles.message}>
        Your application access has expired.
      </Text>
      <Text style={styles.label}>Expiry Date:</Text>
      <Text style={styles.value}>{formatExpiryDate(expiryTime)}</Text>
      <Text style={styles.label}>For continued access, please contact:</Text>
      <Text style={styles.contact}>{contactNumber}</Text>
      <TouchableOpacity style={styles.button} onPress={handleContact}>
        <Text style={styles.buttonText}>Contact Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0F172A",
    padding: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#F87171",
    marginBottom: 16,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#CBD5E1",
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  label: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#F8FAFC",
    marginBottom: 8,
  },
  contact: {
    fontSize: 18,
    fontWeight: "700",
    color: "#F8FAFC",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#208AEF",
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "600",
  },
});
