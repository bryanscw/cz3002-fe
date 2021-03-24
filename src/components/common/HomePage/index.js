import React from 'react'
import {Container, Typography} from "@material-ui/core"

/**
 * This component displays a page when requested content is not found.
 */
export default function HomePage() {
  return (
      <div>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center"
                      color="textPrimary" gutterBottom>
            Trail Making Test
          </Typography>
          <Typography variant="h5" align="center"
                      color="textSecondary" paragraph>
            Trail Making Test is a simple neuropsychological test of
            cognitive processes, including attention, visual search
            and scanning, and psychomotor speed.
          </Typography>
        </Container>
      </div>
  );
}
