import * as React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import happy1 from "../../assets/emotions/happy/happy 1.png";
import happy2 from "../../assets/emotions/happy/happy 2.png";
import original from "../../assets/option1/option2.png";

const animation1 = [original];
const animation2 = [happy1, happy2];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [currentImageIndex1, setCurrentImageIndex1] = React.useState(0);
  const [currentImageIndex2, setCurrentImageIndex2] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex1((prevIndex) => (prevIndex + 1) % animation1.length);
      setCurrentImageIndex2((prevIndex) => (prevIndex + 1) % animation2.length);
    }, 300); // Change image every second
    return () => clearInterval(interval);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ bgcolor: "background.paper", width: 500, borderRadius: 2 }}
      className="mx-auto"
    >
      <TabPanel value={value} index={0} dir={theme.direction}>
        <img
          src={animation1[currentImageIndex1]}
          alt={`p${currentImageIndex1 + 1}`}
          style={{ borderRadius: "8px" }}
          className="mx-auto"
        />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <img
          src={animation2[currentImageIndex2]}
          alt={`p${currentImageIndex2 + 1}`}
          style={{ borderRadius: "8px" }}
          className="mx-auto"
        />
      </TabPanel>
      <AppBar position="static" sx={{ borderRadius: 2 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab label="Option One" {...a11yProps(0)} />
          <Tab label="Option Two" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
    </Box>
  );
}
