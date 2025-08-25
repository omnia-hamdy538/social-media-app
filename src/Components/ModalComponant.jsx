import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
export default function ModalComponant({onOpenChange,isOpen,deleteFunction,isDeleteState}) {
  return (
    <div>
                    <Modal  isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className='text-center'>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col  text-3xl gap-1 text-gray-600">
                <i className="text-amber-600 text-6xl mx-auto fa-solid fa-circle-exclamation"></i>

                Are you sure?

                </ModalHeader>
              <ModalBody>
                <p className=' text-xl text-gray-600'>
                    You won't be able to revert this!
                </p>

              </ModalBody>
              <ModalFooter className='flex justify-center'>
                <Button className=' text-white bg-red-600  hover:bg-red-500' onPress={onClose}>
                  No, cancel!
                </Button>
                <Button isLoading={isDeleteState} className=' text-white bg-success-600  hover:bg-success-500' onPress={()=>deleteFunction(onClose)}>
                  Yes, delete it!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
