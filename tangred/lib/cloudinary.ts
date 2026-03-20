import { v2 as cloudinary } from 'cloudinary'
import { isConfigured } from '@/lib/utils/guards'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function uploadToCloudinary(fileBuffer: Buffer, folder = 'tangred', options: Record<string, unknown> = {}) {
  if (!isConfigured(process.env.CLOUDINARY_CLOUD_NAME) || !isConfigured(process.env.CLOUDINARY_API_KEY) || !isConfigured(process.env.CLOUDINARY_API_SECRET)) {
    return {
      url: `https://res.cloudinary.com/demo/image/upload/${folder}/mock-${Date.now()}.jpg`,
      publicId: `mock-${Date.now()}`,
    }
  }

  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: 'image',
          ...options,
        },
        (error, result) => {
          if (error) {
            reject(error)
            return
          }

          if (!result?.secure_url || !result.public_id) {
            reject(new Error('Cloudinary upload did not return a usable result.'))
            return
          }

          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          })
        }
      )
      .end(fileBuffer)
  })
}

export { cloudinary }
