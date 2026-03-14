import { createContext, useContext, useState, ReactNode } from 'react';

type ModalType = 'quote' | 'offer' | 'product-detail' | 'read-more' | null;

interface ModalContextType {
    activeModal: ModalType;
    modalData: unknown;
    openModal: (type: ModalType, data?: unknown) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [modalData, setModalData] = useState<unknown>(null);

    const openModal = (type: ModalType, data: unknown = null) => {
        setActiveModal(type);
        setModalData(data);
    };

    const closeModal = () => {
        setActiveModal(null);
        setModalData(null);
    };

    return (
        <ModalContext.Provider value={{ activeModal, modalData, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}
