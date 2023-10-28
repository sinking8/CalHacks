import { Fragment, useContext, useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import { Event, getAllLocalStorageItems, getRefValue, getRefValues, isTrue, preventDefault, refs, spreadArraysOrObjects, uploadFiles, useEventLoop } from "/utils/state"
import { ColorModeContext, EventLoopContext, initialEvents, StateContext } from "/utils/context.js"
import "focus-visible/dist/focus-visible"
import { Box, Breadcrumb, BreadcrumbItem, Heading, HStack, Image, Link, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, VStack } from "@chakra-ui/react"
import { getEventURL } from "/utils/state.js"
import NextLink from "next/link"
import { Line as RechartsLine, ResponsiveContainer as RechartsResponsiveContainer, XAxis as RechartsXAxis, YAxis as RechartsYAxis } from "recharts"
import dynamic from "next/dynamic"
import NextHead from "next/head"

const RechartsLineChart = dynamic(() => import('recharts').then((mod) => mod.LineChart), { ssr: false });


export default function Component() {
  const state = useContext(StateContext)
  const router = useRouter()
  const [ colorMode, toggleColorMode ] = useContext(ColorModeContext)
  const focusRef = useRef();
  
  // Main event loop.
  const [addEvents, connectError] = useContext(EventLoopContext)

  // Set focus to the specified element.
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  })

  // Route after the initial page hydration.
  useEffect(() => {
    const change_complete = () => addEvents(initialEvents())
    router.events.on('routeChangeComplete', change_complete)
    return () => {
      router.events.off('routeChangeComplete', change_complete)
    }
  }, [router])


  return (
    <Fragment>
  <Fragment>
  {isTrue(connectError !== null) ? (
  <Fragment>
  <Modal isOpen={connectError !== null}>
  <ModalOverlay>
  <ModalContent>
  <ModalHeader>
  {`Connection Error`}
</ModalHeader>
  <ModalBody>
  <Text>
  {`Cannot connect to server: `}
  {(connectError !== null) ? connectError.message : ''}
  {`. Check if server is reachable at `}
  {getEventURL().href}
</Text>
</ModalBody>
</ModalContent>
</ModalOverlay>
</Modal>
</Fragment>
) : (
  <Fragment/>
)}
</Fragment>
  <VStack spacing={`0`} sx={{"bg": "#111", "color": "#fff", "minH": "100vh", "alignItems": "stretch", "justifyContent": "space-between"}}>
  <Box sx={{"bg": "#222", "backdropFilter": "auto", "backdropBlur": "lg", "p": "4", "borderBottom": "1px solid #fff3", "position": "sticky", "top": "0", "zIndex": "100"}}>
  <HStack sx={{"alignItems": "center", "justifyContent": "space-between"}}>
  <HStack sx={{"alignItems": "center", "justifyContent": "space-between"}}>
  <Link as={NextLink} href={`/`}>
  <Box sx={{"p": "1", "borderRadius": "6", "bg": "#F0F0F0", "mr": "2"}}>
  <Image src={`favicon.ico`} sx={{"width": 30, "height": "auto"}}/>
</Box>
</Link>
  <Breadcrumb>
  <BreadcrumbItem>
  <Heading size={`sm`}>
  {`ElNino`}
</Heading>
</BreadcrumbItem>
</Breadcrumb>
</HStack>
</HStack>
</Box>
  <Box sx={{"bg": "#222"}}>
  <Heading size={`md`}>
  {`Current Active Bots`}
</Heading>
</Box>
  <TableContainer>
  <Table>
  <Thead>
  <Tr>
  <Th>
  {`Bot ID`}
</Th>
  <Th>
  {`Name`}
</Th>
  <Th>
  {`Location`}
</Th>
  <Th>
  {`Current Action`}
</Th>
</Tr>
</Thead>
  <Tbody>
  <Tr>
  <Td>
  {`1`}
</Td>
  <Td>
  {`John`}
</Td>
  <Td>
  {`New York`}
</Td>
  <Td>
  {`Navigate`}
</Td>
</Tr>
  <Tr>
  <Td>
  {`2`}
</Td>
  <Td>
  {`Jane`}
</Td>
  <Td>
  {`San Francisco`}
</Td>
  <Td>
  {`Investigate`}
</Td>
</Tr>
  <Tr>
  <Td>
  {`3`}
</Td>
  <Td>
  {`Joe`}
</Td>
  <Td>
  {`Los Angeles`}
</Td>
  <Td>
  {`Report`}
</Td>
</Tr>
</Tbody>
</Table>
</TableContainer>
  <Box sx={{"bg": "#222"}}>
  <Heading size={`md`}>
  {`Bots Statistics`}
</Heading>
</Box>
  <VStack sx={{"height": "20em", "width": "100%", "alignItems": "stretch", "justifyContent": "space-between"}}>
  <RechartsResponsiveContainer height={`100%`} minHeight={100} minWidth={200} width={`100%`}>
  <RechartsLineChart data={state.line_chart_state.data} height={`100%`} width={`100%`}>
  <RechartsLine dataKey={`pv`} stroke={`#8884d8`} type={state.line_chart_state.pv_type}/>
  <RechartsLine dataKey={`uv`} stroke={`#82ca9d`} type={state.line_chart_state.uv_type}/>
  <RechartsXAxis dataKey={`name`}/>
  <RechartsYAxis/>
</RechartsLineChart>
</RechartsResponsiveContainer>
</VStack>
</VStack>
  <NextHead>
  <title>
  {`Reflex App`}
</title>
  <meta content={`A Reflex app.`} name={`description`}/>
  <meta content={`favicon.ico`} property={`og:image`}/>
</NextHead>
</Fragment>
  )
}
