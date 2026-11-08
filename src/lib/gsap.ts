/**
 * Single place where GSAP plugins are registered.
 * Always import gsap / ScrollTrigger / useGSAP from here so registration
 * happens exactly once, before any animation is created.
 */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

export { gsap, ScrollTrigger, useGSAP }
