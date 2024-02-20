'use client'

import { AiOutlineInfoCircle } from 'react-icons/ai'
import { HiOutlineUpload, HiOutlineX } from 'react-icons/hi'

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import clsx from 'clsx'
import Image from 'next/image'
import Dropzone from 'react-dropzone'

import { FileData } from '../page'

const MediaPanel = ({
  files,
  setFiles,
  onDrop,
  displayPreview,
  setDisplayPreview,
}: {
  files: FileData[]
  setFiles: (_files: FileData[]) => void
  onDrop: (_files: File[]) => void
  displayPreview: FileData | null
  setDisplayPreview: (_file: FileData | null) => void
}) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return
    }

    const reorderedFiles = reorder(files, result.source.index, result.destination.index)

    setFiles(reorderedFiles)
  }

  const reorder = (list: FileData[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    result.forEach((item, index) => {
      item.order = index
    })

    return result
  }

  const removeMedia = (id: string) => {
    const updatedFiles = files
      .filter((file) => file.id !== id)
      .map((file, index) => {
        file.order = index
        return file
      })

    setFiles(updatedFiles)
    if (displayPreview?.id === id) {
      if (updatedFiles.length > 0) {
        setDisplayPreview(updatedFiles[0])
      } else {
        setDisplayPreview(null)
      }
    }
  }

  const uploadThumbnail = (file: File, id: string) => {
    const thumbnailUrl = URL.createObjectURL(file)
    const updatedFiles = [...files]
    const fileIndex = updatedFiles.findIndex((file) => file.id === id)
    updatedFiles[fileIndex].thumbnail = file
    updatedFiles[fileIndex].thumbnailUrl = thumbnailUrl
    setFiles(updatedFiles)
  }

  return (
    <>
      <div className='mt-6 bg-gray-950 rounded relative w-full p-2 flex overflow-x-scroll custom-scrollbar'>
        {files.length < 10 && (
          <Dropzone
            accept={{
              'image/*': ['.png', '.jpeg', '.jpg'],
              'video/*': ['.mp4', '.webm'],
            }}
            multiple
            maxFiles={10}
            onDrop={onDrop}
          >
            {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
              <div
                className={clsx(
                  'h-24 flex aspect-video overflow-hidden rounded items-center justify-center focus-visible-ring shrink-0',
                  isDragActive
                    ? isDragAccept
                      ? 'bg-green-900/25'
                      : isDragReject
                      ? 'bg-red-900/25'
                      : 'bg-gray-800'
                    : 'bg-white/5 hover:bg-white/10'
                )}
                {...getRootProps()}
              >
                <HiOutlineUpload className='h-8 w-8 text-gray-400' />
                <input {...getInputProps()} />
              </div>
            )}
          </Dropzone>
        )}
        <div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='droppable' direction='horizontal'>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className='items-center flex'>
                  {files
                    .sort((a, b) => a.order - b.order)
                    .map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...provided.draggableProps.style }}
                            className='select-none will-change-transform ml-2 focus-visible-ring rounded'
                          >
                            {snapshot.isDragging ? (
                              item.isVideo ? (
                                <div className='flex space-x-2 bg-gray-800 p-1 rounded h-24'>
                                  <div className='h-full aspect-video bg-gray-900 rounded' />
                                  <div className='h-full aspect-video bg-gray-900 rounded' />
                                </div>
                              ) : (
                                <div className='h-24 aspect-video bg-gray-900 rounded' />
                              )
                            ) : (
                              <>
                                {item.isVideo ? (
                                  <div className='flex space-x-2 bg-gray-800 p-1 rounded h-24'>
                                    <div className='relative h-full aspect-video rounded overflow-hidden bg-gray-800'>
                                      <Image
                                        src={item.thumbnailUrl ?? ''}
                                        alt='item'
                                        fill
                                        className='object-cover object-center'
                                        quality={1}
                                        onClick={() => setDisplayPreview(item)}
                                      />
                                      <button
                                        className='absolute top-0 right-0 p-1 rounded-full m-1 bg-gray-900 hover:scale-125 focus-visible-ring'
                                        onClick={() => {
                                          removeMedia(item.id)
                                        }}
                                      >
                                        <HiOutlineX className={`h-3 w-3 text-gray-200 stroke-2`} />
                                      </button>
                                    </div>

                                    <Dropzone
                                      accept={{
                                        'image/*': ['.png', '.jpeg', '.jpg'],
                                      }}
                                      onDrop={(acceptedFiles) => {
                                        uploadThumbnail(acceptedFiles[0], item.id)
                                      }}
                                    >
                                      {({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject }) => (
                                        <div
                                          className={clsx(
                                            'h-full aspect-video overflow-hidden rounded-lg flex-shrink-0 flex flex-col items-center justify-center focus-visible-ring',
                                            isDragActive
                                              ? isDragAccept
                                                ? 'bg-green-900/25'
                                                : isDragReject
                                                ? 'bg-red-900/25'
                                                : 'bg-gray-800'
                                              : 'bg-white/5 hover:bg-white/10'
                                          )}
                                          {...getRootProps()}
                                        >
                                          <HiOutlineUpload className='h-6 w-6 text-gray-400' />
                                          <p className='mt-1 text-gray-400 font-semibold text-xs text-center'>
                                            Upload <br /> Custom Thumbnail
                                          </p>
                                          <input {...getInputProps()} />
                                        </div>
                                      )}
                                    </Dropzone>
                                  </div>
                                ) : (
                                  <div className='h-24 relative aspect-video rounded overflow-hidden bg-gray-800'>
                                    <Image
                                      src={item.fileUrl}
                                      alt='item'
                                      fill
                                      quality={1}
                                      onClick={() => setDisplayPreview(item)}
                                      className='object-cover object-center'
                                    />
                                    <button
                                      className='absolute top-0 right-0 p-1 rounded-full m-1 bg-gray-900 hover:scale-125 focus-visible-ring'
                                      onClick={() => {
                                        removeMedia(item.id)
                                      }}
                                    >
                                      <HiOutlineX className={`h-3 w-3 text-gray-200 stroke-2`} />
                                    </button>
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
      <div className='flex items-start text-gray-400 mt-3'>
        <AiOutlineInfoCircle className='mr-1.5 mt-0.5 flex-shrink-0' />
        <p className='text-sm'>
          Order the images and videos according to how you want them to appear on your storefront. Videos should ideally
          be displayed first.
        </p>
      </div>
    </>
  )
}

export default MediaPanel
