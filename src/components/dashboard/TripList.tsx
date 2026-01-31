'use client';
import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '@/app/dashboard/dashboard.module.css';
import { Trip, Note } from '@/types';

interface TripListProps {
    trips: Trip[];
    onDeleteTrip: (id: string) => void;
    onUpdateTrip: (updatedTrip: Trip) => void; // General update handler
}

export const TripList = memo(({ trips, onDeleteTrip, onUpdateTrip }: TripListProps) => {
    const [noteInputs, setNoteInputs] = useState<Record<string, { show: boolean, text: string }>>({});
    const [editingNote, setEditingNote] = useState<{ tripId: string; noteId: string; text: string } | null>(null);

    const handleToggleNoteInput = (tripId: string) => {
        setNoteInputs({
            ...noteInputs,
            [tripId]: {
                show: !noteInputs[tripId]?.show,
                text: ''
            }
        });
    };

    const handleNoteTextChange = (tripId: string, text: string) => {
        setNoteInputs({
            ...noteInputs,
            [tripId]: { ...noteInputs[tripId], text }
        });
    };

    const handleAddNoteToTrip = async (tripId: string) => {
        const noteText = noteInputs[tripId]?.text?.trim();
        if (!noteText) return;

        try {
            const res = await fetch('/api/notes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tripId, content: noteText }),
            });

            if (res.ok) {
                const data = await res.json();
                const trip = trips.find(t => t.id === tripId);
                if (trip) {
                    onUpdateTrip({ ...trip, notes: [data.note, ...trip.notes] });
                }

                setNoteInputs({
                    ...noteInputs,
                    [tripId]: { show: false, text: '' }
                });
            }
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    const handleDeleteTripNote = async (tripId: string, noteId: string) => {
        try {
            const res = await fetch(`/api/notes/${noteId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                const trip = trips.find(t => t.id === tripId);
                if (trip) {
                    onUpdateTrip({ ...trip, notes: trip.notes.filter(n => n.id !== noteId) });
                }
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const handleStartEdit = (tripId: string, noteId: string, currentText: string) => {
        setEditingNote({ tripId, noteId, text: currentText });
    };

    const handleSaveEdit = () => {
        if (!editingNote || !editingNote.text.trim()) return;

        const trip = trips.find(t => t.id === editingNote.tripId);
        if (trip) {
            const updatedNotes = trip.notes.map((note) =>
                note.id === editingNote.noteId ? { ...note, content: editingNote.text } : note
            );
            onUpdateTrip({ ...trip, notes: updatedNotes });
        }
        setEditingNote(null);
    };

    return (
        <div className={styles.tripListContainer}>
            <AnimatePresence>
                {trips.map((trip) => (
                    <motion.div
                        key={trip.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        layout
                        className={styles.tripCard}
                    >
                        <div className={styles.tripCardHeader}>
                            {trip.startDate} - {trip.endDate}
                        </div>

                        <div className={styles.tripCardActions}>
                            <button className={styles.btnTertiary}>
                                {trip.destination}
                            </button>
                            <button
                                className={styles.btnSecondary}
                                onClick={() => onDeleteTrip(trip.id)}
                            >
                                Eliminar Viaje
                            </button>
                        </div>

                        {(trip.notes?.length || 0) > 0 && (
                            <div className={styles.tripCardNotes}>
                                <AnimatePresence>
                                    {(trip.notes || []).map((note) => (
                                        <motion.div
                                            key={note.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className={styles.tripItem}
                                        >
                                            {editingNote?.tripId === trip.id && editingNote?.noteId === note.id ? (
                                                <div style={{ width: '100%' }}>
                                                    <input
                                                        type="text"
                                                        name="edit-note"
                                                        autoComplete="off"
                                                        className={styles.input}
                                                        value={editingNote.text}
                                                        onChange={(e) => setEditingNote({ ...editingNote, text: e.target.value })}
                                                        autoFocus
                                                        style={{ marginBottom: '0.5rem' }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') handleSaveEdit();
                                                            if (e.key === 'Escape') setEditingNote(null);
                                                        }}
                                                    />
                                                    <div className={styles.tripActions}>
                                                        <button
                                                            className={styles.btnPrimary}
                                                            style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
                                                            onClick={handleSaveEdit}
                                                        >
                                                            Guardar
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <span className={styles.tripText}>{note.content}</span>
                                                    <div className={styles.tripActions}>
                                                        <button
                                                            className={styles.btnEdit}
                                                            onClick={() => handleStartEdit(trip.id, note.id, note.content)}
                                                        >
                                                            Editar
                                                        </button>
                                                        <button
                                                            className={styles.btnDelete}
                                                            onClick={() => handleDeleteTripNote(trip.id, note.id)}
                                                        >
                                                            ✕
                                                        </button>
                                                    </div>
                                                </>
                                            )}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        )}

                        {noteInputs[trip.id]?.show && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                style={{ marginTop: '1rem' }}
                            >
                                <div className={styles.inputGroup}>
                                    <input
                                        type="text"
                                        name="add-note"
                                        autoComplete="off"
                                        className={styles.input}
                                        placeholder="Add a note"
                                        value={noteInputs[trip.id]?.text || ''}
                                        onChange={(e) => handleNoteTextChange(trip.id, e.target.value)}
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleAddNoteToTrip(trip.id);
                                            }
                                        }}
                                        autoFocus
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                    <button
                                        className={styles.btnPrimary}
                                        onClick={() => handleAddNoteToTrip(trip.id)}
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        <button
                            className={styles.btnAddNote}
                            onClick={() => handleToggleNoteInput(trip.id)}
                        >
                            Agregar Nota
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
});

TripList.displayName = 'TripList';
