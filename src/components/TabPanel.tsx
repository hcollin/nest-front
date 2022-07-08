import { Box } from "@mui/system";



interface TabPanelProps {
    children?: React.ReactNode;
    index: string;
    value: string;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && props.children}
      </div>
    );
  }


  export default TabPanel;