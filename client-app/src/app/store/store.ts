import { create } from 'zustand';
import { Activity } from '../models/activity';

type GlobalStore = {
    activity?: Activity;
    activities: Activity[];
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    setActivities: (activities: Activity[]) => void;
    openForm: (id?: string) => void;
    editMode: Boolean;
    setEditMode: (editMdoe: Boolean) => void;
    closeForm: () => void;
};

const useStore = create<GlobalStore>((set) => ({
    activity: undefined,
    editMode: false,
    selectActivity: (id: string) => set((store) => ({ activity: store.activities.find(x => x.id === id) })),
    cancelSelectActivity: () => set(() => ({ activity: undefined })),
    activities: [],
    setActivities: (activities: Activity[]) => set(() => ({ activities })),
    setEditMode: (editMode: Boolean) => set(() => ({ editMode })),
    openForm: (id?: string) => set((store) => {
        id ? store.selectActivity(id) : store.cancelSelectActivity();

        return { editMode : true };
    }),
    closeForm:  () => set(() => ({ editMode: false }))
}));

export default useStore;