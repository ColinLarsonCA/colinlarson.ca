import React from "react";
import { 
  Card,
  CardContent,
  CardHeader,
  Link,
  Typography,
} from '@material-ui/core';

export function IntroCard() {
  return (
    <Card>
      <CardHeader
        title="Work History"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="textSecondary">
          I have been active in the tech industry since starting my B.Sc at the University of Saskatchewan in 2009. Beginning as an IT Support during the summer of my third year and continuously seeking out new challenges and technology stacks after graduating I have gained a wide breadth of experience.
          <br/><br/>
          You can read all about my past professional work, starting with <Link href="/history/2012-05-nhrc">NHRC</Link>.
        </Typography>
      </CardContent>
    </Card>
  );
}