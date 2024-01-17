declare module '@readr-media/react-image' {
  interface ImageProps {
    images: PostImage
    alt: string
    loadingImage?: string
    defaultImage?: string
    rwd?: {
      mobile?: string
      tablet?: string
      laptop?: string
      desktop?: string
      default?: string
    }
    priority?: boolean
    className?: string
  }

  const Image: React.FC<ImageProps>

  export default Image
}
