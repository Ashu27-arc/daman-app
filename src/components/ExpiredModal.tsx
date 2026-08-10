import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from "react-native";
import * as Linking from "expo-linking";
import { formatExpiryDate } from "@/utils/dateUtils";

interface ExpiredModalProps {
  visible: boolean;
  expiryTime: string;
  contactNumber: string;
  onClose: () => void;
}

export function ExpiredModal({
  visible,
  expiryTime,
  contactNumber,
  onClose,
}: ExpiredModalProps) {
  const handleContact = () => {
    Linking.openURL(`tel:${contactNumber.replace(/\s/g, "")}`);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Application Expired</Text>
          <Text style={styles.message}>
            Your application access has expired.
          </Text>
          <Text style={styles.label}>Expiry Date:</Text>
          <Text style={styles.value}>{formatExpiryDate(expiryTime)}</Text>
          <Text style={styles.label}>Contact:</Text>
          <Text style={styles.value}>{contactNumber}</Text>
          <TouchableOpacity style={styles.button} onPress={handleContact}>
            <Text style={styles.buttonText}>Contact Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    maxWidth: 360,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0F172A",
    textAlign: "center",
    marginBottom: 12,
  },
  message: {
    fontSize: 15,
    color: "#475569",
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 22,
  },
  label: {
    fontSize: 13,
    color: "#64748B",
    marginTop: 8,
  },
  value: {
    fontSize: 15,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#208AEF",
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    marginTop: 12,
    alignItems: "center",
    paddingVertical: 8,
  },
  closeText: {
    color: "#64748B",
    fontSize: 14,
  },
});
