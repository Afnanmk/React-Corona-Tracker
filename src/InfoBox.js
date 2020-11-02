import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./InfoBox.css";

function InfoBox({ title, total, daily }) {
  return (
    <div className="infobox">
      <Card className="infobox__card">
        <CardContent>
          <Typography variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="h4" component="h3">
            {total}
          </Typography>
          <Typography color="textSecondary">+{daily} new</Typography>
        </CardContent>
      </Card>
    </div>
  );
}

export default InfoBox;
