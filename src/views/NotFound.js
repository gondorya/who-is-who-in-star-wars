import React from "react";
import { Container, Box, Button, Stack } from "@mui/material";

export default function NotFoundPage () {
   return  (
       <Container
           maxWidth={"md"}
           sx={{
               backgroundColor: "primary.light",
               padding: "40px 20px",
               borderRadius: "4px"
           }}
       >
           <Box
               sx={{
                   color: "common.white",
                   fontSize: "50px",
                   fontWeight: "bold",
                   textAlign: "center"
               }}
           >
               <Stack>
                   <span>
                       404
                   </span>
                   <span>Page Not Found</span>
               </Stack>
           </Box>
       </Container>
   )
}

