 {/* <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              height: 300,
              width: "400px",
              boxShadow: "0px 6px 20px , #fff",
              border: "2px solid #26a69a",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight:"bold"}}>
              Company Growth
            </Typography>
            {companyGrowth.length === 0 ? (
              <Typography align="center">No growth data available</Typography>
            ) : (
              <ResponsiveContainer width="100%" height="85%">
                <LineChart data={companyGrowth}>
                  <XAxis dataKey="month" stroke="#000" />
                  <YAxis stroke="#000" />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#26a69a"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>  */}



        //     <Grid item xs={12} md={6}>
        //   <Paper
        //     sx={{
        //       p: 3,
        //       borderRadius: 3,
        //       height: 290,
        //       width: "400px",
        //       // background: "#90a4ae",
        //       boxShadow: "0px 6px 20px , #fff",
        //       border: "3px solid #26a69a",
        //     }}
        //   >
        //     {/* Header Bar */}
        //     <Box>
        //       <Typography
        //         variant="h6"
        //         sx={{
        //           fontWeight: "bold",
        //           color: "black",
        //           mb: 4,
        //         }}
        //       >
        //         Company Growth
        //       </Typography>
        //     </Box>

        //     {/* Chart Section */}
        //     {companyGrowth.length === 0 ? (
        //       <Typography align="center">No growth data available</Typography>
        //     ) : (
        //       <ResponsiveContainer width="100%" height="80%">
        //         <BarChart data={companyGrowth} barSize={60}>
        //           <XAxis dataKey="month" stroke="#333" />
        //           <YAxis stroke="#333" />
        //           <Tooltip
        //             contentStyle={{
        //               backgroundColor: "#1e293b",
        //               color: "#fff",
        //               borderRadius: 8,
        //             }}
        //           />
        //           <Bar
        //             dataKey="count"
        //             fill="#009688" 
        //             radius={[6, 6, 0, 0]}
        //           />
        //         </BarChart>
        //       </ResponsiveContainer>
        //     )}
        //   </Paper>
        // </Grid>