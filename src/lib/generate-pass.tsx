import path from "path";
import ReactPDF, {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const fontsDir = path.join(process.cwd(), "public", "fonts");

Font.register({
  family: "Cormorant",
  fonts: [
    {
      src: path.join(fontsDir, "CormorantGaramond-Light.ttf"),
      fontWeight: 300,
    },
    {
      src: path.join(fontsDir, "CormorantGaramond-LightItalic.ttf"),
      fontWeight: 300,
      fontStyle: "italic",
    },
  ],
});

Font.register({
  family: "Jost",
  src: path.join(fontsDir, "Jost-Regular.ttf"),
  fontWeight: 400,
});

const GOLD = "#C4913A";
const DARK = "#1A1714";
const CREAM = "#FAF7F2";
const MUTED = "#9A8B7A";
const GOLD_DIM = "rgba(196,145,58,0.2)";

const styles = StyleSheet.create({
  page: {
    backgroundColor: DARK,
    padding: 0,
    width: "148mm",
    height: "210mm",
    flexDirection: "column",
    position: "relative",
  },

  // Gold border frame
  border: {
    position: "absolute",
    top: 16,
    left: 16,
    right: 16,
    bottom: 16,
    borderWidth: 0.5,
    borderColor: GOLD_DIM,
    borderStyle: "solid",
  },

  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 40,
    paddingTop: 52,
    paddingBottom: 44,
  },

  // Top section
  top: {
    alignItems: "center",
    width: "100%",
  },
  eyebrow: {
    fontFamily: "Jost",
    fontSize: 7,
    letterSpacing: 3,
    color: GOLD,
    textTransform: "uppercase",
    marginBottom: 16,
  },
  monogram: {
    fontFamily: "Cormorant",
    fontSize: 42,
    fontWeight: 300,
    fontStyle: "italic",
    color: GOLD,
    letterSpacing: 4,
    marginBottom: 10,
  },
  dividerLine: {
    width: 40,
    height: 0.5,
    backgroundColor: GOLD_DIM,
    marginVertical: 16,
  },
  weddingTitle: {
    fontFamily: "Cormorant",
    fontSize: 11,
    fontWeight: 300,
    color: CREAM,
    letterSpacing: 3,
    textTransform: "uppercase",
    marginBottom: 4,
  },

  // Middle — guest name section
  middle: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 28,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: GOLD_DIM,
    borderStyle: "solid",
  },
  admitsLabel: {
    fontFamily: "Jost",
    fontSize: 7,
    letterSpacing: 3,
    color: MUTED,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  guestName: {
    fontFamily: "Cormorant",
    fontSize: 28,
    fontWeight: 300,
    fontStyle: "italic",
    color: CREAM,
    textAlign: "center",
    lineHeight: 1.2,
    marginBottom: 8,
  },
  guestId: {
    fontFamily: "Jost",
    fontSize: 8,
    color: GOLD,
    letterSpacing: 2,
    marginTop: 4,
  },
  guestCount: {
    fontFamily: "Jost",
    fontSize: 8,
    color: MUTED,
    letterSpacing: 1,
    marginTop: 6,
  },

  // Bottom section
  bottom: {
    alignItems: "center",
    width: "100%",
  },
  eventRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  eventBlock: {
    alignItems: "center",
    flex: 1,
  },
  eventLabel: {
    fontFamily: "Jost",
    fontSize: 6.5,
    letterSpacing: 2,
    color: GOLD,
    textTransform: "uppercase",
    marginBottom: 5,
  },
  eventValue: {
    fontFamily: "Cormorant",
    fontSize: 10,
    fontWeight: 300,
    color: CREAM,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  eventDivider: {
    width: 0.5,
    backgroundColor: GOLD_DIM,
    alignSelf: "stretch",
    marginHorizontal: 8,
  },
  hashtag: {
    fontFamily: "Cormorant",
    fontSize: 9,
    fontStyle: "italic",
    color: GOLD,
    letterSpacing: 1,
    marginTop: 4,
  },
});

interface GuestData {
  guest_id: string;
  first_name: string;
  last_name: string;
  guest_count: number;
  attending: string;
}

function EventPass({ guest }: { guest: GuestData }) {
  const attendingLabel =
    guest.attending === "both"
      ? "Ceremony & Reception"
      : guest.attending === "reception"
        ? "Reception"
        : guest.attending === "ceremony"
          ? "Ceremony Only"
          : "Reception";

  return (
    <Document>
      <Page size="A5" style={styles.page}>
        {/* Gold border frame */}
        <View style={styles.border} />

        <View style={styles.content}>
          {/* Top */}
          <View style={styles.top}>
            <Text style={styles.eyebrow}>Wedding Invitation</Text>
            <Text style={styles.monogram}>A ♡ O</Text>
            <View style={styles.dividerLine} />
            <Text style={styles.weddingTitle}>Adedamola & Oluwaseun</Text>
          </View>

          {/* Middle — guest name */}
          <View style={styles.middle}>
            <Text style={styles.admitsLabel}>This pass admits</Text>
            <Text style={styles.guestName}>
              {guest.first_name} {guest.last_name}
            </Text>
            <Text style={styles.guestId}>{guest.guest_id}</Text>
            <Text style={styles.guestCount}>
              Party of {guest.guest_count}{" "}
              {guest.guest_count === 1 ? "person" : "people"}
            </Text>
          </View>

          {/* Bottom — event details */}
          <View style={styles.bottom}>
            <View style={styles.eventRow}>
              <View style={styles.eventBlock}>
                <Text style={styles.eventLabel}>Date</Text>
                <Text style={styles.eventValue}>
                  Saturday{"\n"}15 August 2026
                </Text>
              </View>
              <View style={styles.eventDivider} />
              <View style={styles.eventBlock}>
                <Text style={styles.eventLabel}>Event</Text>
                <Text style={styles.eventValue}>{attendingLabel}</Text>
              </View>
              <View style={styles.eventDivider} />
              <View style={styles.eventBlock}>
                <Text style={styles.eventLabel}>Dress Code</Text>
                <Text style={styles.eventValue}>
                  Burgundy{"\n"}Peach · Gold
                </Text>
              </View>
            </View>

            <View style={styles.dividerLine} />

            <Text style={styles.hashtag}>#AdeOluwa26</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export async function generateEventPassPDF(guest: GuestData): Promise<Buffer> {
  const stream = await ReactPDF.renderToStream(<EventPass guest={guest} />);

  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}
