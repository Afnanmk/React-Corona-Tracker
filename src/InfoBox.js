import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./InfoBox.css";
import numeral from "numeral";

function InfoBox({ title, total, daily }) {
  return (
    // <div className="infobox">
    <Card className="infobox__card">
      <CardContent>
        <Typography variant="h6" component="h2" className="infobox__title">
          {title}
        </Typography>

        <Typography variant="h4" component="h3" className="infobox__total">
          {numeral(total).format("0,0")}
        </Typography>

        <Typography color="textSecondary" className="infobox__daily">
          +{numeral(daily).format("0,0")} new
        </Typography>
      </CardContent>
    </Card>
    // </div>
  );
}

export default InfoBox;
