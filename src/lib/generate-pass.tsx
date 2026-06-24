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
const DARK2 = "#241E19";
const CREAM = "#FAF7F2";
const MUTED = "#9A8B7A";
const GOLD_DIM = "rgba(196,145,58,0.25)";

// Credit card size: 85.6mm x 54mm
const CARD_WIDTH = "85.6mm";
const CARD_HEIGHT = "54mm";

const styles = StyleSheet.create({
  page: {
    backgroundColor: DARK,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    padding: 0,
    position: "relative",
  },

  // ── FRONT ──
  border: {
    position: "absolute",
    top: 6,
    left: 6,
    right: 6,
    bottom: 6,
    borderWidth: 0.5,
    borderColor: GOLD_DIM,
    borderStyle: "solid",
  },

  frontContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "stretch",
    padding: 14,
    paddingHorizontal: 16,
  },

  // Left column — branding
  leftCol: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: 1,
    paddingRight: 12,
    borderRightWidth: 0.5,
    borderRightColor: GOLD_DIM,
    borderStyle: "solid",
  },
  eyebrow: {
    fontFamily: "Jost",
    fontSize: 4.5,
    letterSpacing: 2,
    color: GOLD,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  monogram: {
    fontFamily: "Cormorant",
    fontSize: 22,
    fontWeight: 300,
    fontStyle: "italic",
    color: GOLD,
    letterSpacing: 2,
    lineHeight: 1,
  },
  coupleNames: {
    fontFamily: "Jost",
    fontSize: 5,
    letterSpacing: 1.5,
    color: CREAM,
    textTransform: "uppercase",
    marginTop: 4,
  },
  dateBlock: {
    marginTop: "auto",
  },
  dateLabel: {
    fontFamily: "Jost",
    fontSize: 5,
    letterSpacing: 1.5,
    color: MUTED,
    textTransform: "uppercase",
    marginBottom: 2,
  },
  dateValue: {
    fontFamily: "Cormorant",
    fontSize: 8,
    fontWeight: 300,
    color: CREAM,
    letterSpacing: 0.5,
  },

  // Right column — guest info
  rightCol: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flex: 1.2,
    paddingLeft: 12,
  },
  admitsLabel: {
    fontFamily: "Jost",
    fontSize: 4,
    letterSpacing: 2,
    color: MUTED,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  guestName: {
    fontFamily: "Cormorant",
    fontSize: 16,
    fontWeight: 300,
    fontStyle: "italic",
    color: CREAM,
    lineHeight: 1.2,
  },
  guestId: {
    fontFamily: "Jost",
    fontSize: 6,
    color: GOLD,
    letterSpacing: 1.5,
    marginTop: 3,
  },
  guestCount: {
    fontFamily: "Jost",
    fontSize: 5.5,
    color: CREAM,
    letterSpacing: 1,
    marginTop: 2,
  },
  eventBadge: {
    marginTop: "auto",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderWidth: 0.5,
    borderColor: GOLD_DIM,
    borderStyle: "solid",
  },
  eventBadgeText: {
    fontFamily: "Jost",
    fontSize: 4.5,
    letterSpacing: 1.5,
    color: GOLD,
    textTransform: "uppercase",
  },

  // ── BACK ──
  backPage: {
    backgroundColor: DARK2,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    padding: 0,
    position: "relative",
  },
  backBorder: {
    position: "absolute",
    top: 6,
    left: 6,
    right: 6,
    bottom: 6,
    borderWidth: 0.5,
    borderColor: GOLD_DIM,
    borderStyle: "solid",
  },
  backContent: {
    flex: 1,
    padding: 16,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  backTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  backSection: {
    flex: 1,
  },
  backSectionDivider: {
    width: 0.5,
    backgroundColor: GOLD_DIM,
    marginHorizontal: 10,
    alignSelf: "stretch",
  },
  backLabel: {
    fontFamily: "Jost",
    fontSize: 4,
    letterSpacing: 2,
    color: GOLD,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  backValue: {
    fontFamily: "Cormorant",
    fontSize: 8,
    fontWeight: 300,
    color: CREAM,
    lineHeight: 1.4,
  },
  backBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    borderTopWidth: 0.5,
    borderTopColor: GOLD_DIM,
    borderStyle: "solid",
    paddingTop: 6,
  },
  hashtag: {
    fontFamily: "Cormorant",
    fontSize: 7,
    fontStyle: "italic",
    color: GOLD,
    letterSpacing: 1,
  },
  note: {
    fontFamily: "Jost",
    fontSize: 4,
    color: CREAM,
    letterSpacing: 0.5,
    textAlign: "right",
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
      {/* ── FRONT ── */}
      <Page size={[242.64, 153.07]} style={styles.page}>
        <View style={styles.border} />
        <View style={styles.frontContent}>
          {/* Left — branding + date */}
          <View style={styles.leftCol}>
            <View>
              <Text style={styles.eyebrow}>Access Card</Text>
              <Text style={styles.monogram}>AO</Text>
              <Text style={styles.coupleNames}>Adedamola & Oluwaseun</Text>
            </View>
            <View style={styles.dateBlock}>
              <Text style={styles.dateLabel}>Date</Text>
              <Text style={styles.dateValue}>Saturday, 15th Aug 2026</Text>
            </View>
          </View>

          {/* Right — guest details */}
          <View style={styles.rightCol}>
            <View>
              <Text style={styles.admitsLabel}>This card admits</Text>
              <Text style={styles.guestName}>
                {guest.first_name}
                {"\n"}
                {guest.last_name}
              </Text>
              <Text style={styles.guestId}>{guest.guest_id}</Text>
              <Text style={styles.guestCount}>
                Card of {guest.guest_count}{" "}
                {guest.guest_count === 1 ? "person" : "people"}
              </Text>
            </View>
            <View style={styles.eventBadge}>
              <Text style={styles.eventBadgeText}>{attendingLabel}</Text>
            </View>
          </View>
        </View>
      </Page>

      {/* ── BACK ── */}
      <Page size={[242.64, 153.07]} style={styles.backPage}>
        <View style={styles.backBorder} />
        <View style={styles.backContent}>
          <View style={styles.backTop}>
            {/* Ceremony */}
            <View style={styles.backSection}>
              <Text style={styles.backLabel}>Ceremony</Text>
              <Text style={styles.backValue}>
                The Cathedral of{"\n"}ST Barnabas{"\n"}10:00 AM
              </Text>
            </View>

            <View style={styles.backSectionDivider} />

            {/* Reception */}
            <View style={styles.backSection}>
              <Text style={styles.backLabel}>Reception</Text>
              <Text style={styles.backValue}>
                Diamond Arena{"\n"}Ilorin, Kwara State{"\n"}1:00 PM
              </Text>
            </View>

            <View style={styles.backSectionDivider} />

            {/* Dress code */}
            <View style={styles.backSection}>
              <Text style={styles.backLabel}>Dress Code</Text>
              <Text style={styles.backValue}>
                Burgundy{"\n"}Peach{"\n"}Gold
              </Text>
            </View>
          </View>

          <View style={styles.backBottom}>
            <Text style={styles.hashtag}>#AdeOluwa26</Text>
            <Text style={styles.note}>
              This pass is non-transferable.{"\n"}Strictly by invitation only.
            </Text>
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
