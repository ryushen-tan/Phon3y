export type SaveModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSave?: (data: {
        title: string;
        description: string;
        date: string;
        showInRecent: boolean;
    }) => void;
    Name: string;
};