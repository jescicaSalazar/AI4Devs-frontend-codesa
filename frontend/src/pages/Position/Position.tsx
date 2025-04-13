import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ArrowLeft } from 'react-bootstrap-icons';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import './Position.css';

interface Candidate {
  id: string;
  name: string;
  score: number;
  phase: string;
  avatar?: string;
  lastUpdate: string;
}

interface Phase {
  id: string;
  name: string;
  candidates: Candidate[];
  color: string;
}

interface PositionData {
  title: string;
  phases: Phase[];
}

const Position: React.FC = () => {
  const { positionId } = useParams<{ positionId: string }>();
  const navigate = useNavigate();
  const [positionData, setPositionData] = useState<PositionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPositionData();
  }, [positionId]);

  const fetchPositionData = async () => {
    try {
      const mockData: PositionData = {
        title: 'Desarrollador Frontend Senior',
        phases: [
          {
            id: '1',
            name: 'Aplicación recibida',
            color: '#FF6B6B',
            candidates: [
              {
                id: '1',
                name: 'Juan Pérez',
                score: 4.5,
                phase: '1',
                lastUpdate: '2024-04-08',
                avatar: 'https://i.pravatar.cc/150?img=1',
              },
              {
                id: '2',
                name: 'María García',
                score: 4.2,
                phase: '1',
                lastUpdate: '2024-04-07',
                avatar: 'https://i.pravatar.cc/150?img=2',
              },
            ],
          },
          {
            id: '2',
            name: 'Entrevista técnica',
            color: '#4ECDC4',
            candidates: [
              {
                id: '3',
                name: 'Carlos López',
                score: 4.8,
                phase: '2',
                lastUpdate: '2024-04-06',
                avatar: 'https://i.pravatar.cc/150?img=3',
              },
            ],
          },
          {
            id: '3',
            name: 'Oferta',
            color: '#45B7D1',
            candidates: [],
          },
          {
            id: '4',
            name: 'Contratado',
            color: '#96CEB4',
            candidates: [],
          },
          {
            id: '5',
            name: 'Rechazado',
            color: '#FFEEAD',
            candidates: [],
          },
        ],
      };
      setPositionData(mockData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching position data:', error);
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (result: any) => {
    const { source, destination, draggableId } = result;
    if (!destination || !positionData) return;

    const updatedPhases = [...positionData.phases];
    const sourcePhase = updatedPhases.find(p => p.id === source.droppableId);
    const destPhase = updatedPhases.find(p => p.id === destination.droppableId);

    if (!sourcePhase || !destPhase) return;

    const candidate = sourcePhase.candidates.find(c => c.id.toString() === draggableId);
    if (!candidate) return;

    sourcePhase.candidates.splice(source.index, 1);
    destPhase.candidates.splice(destination.index, 0, candidate);

    if (source.droppableId !== destination.droppableId) {
      try {
        await fetch(`/api/candidates/${draggableId}/update-phase`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phaseId: destination.droppableId }),
        });
      } catch (error) {
        alert('No se pudo actualizar la fase del candidato. Por favor, inténtalo de nuevo.');
        return;
      }
    }

    setPositionData({ ...positionData, phases: updatedPhases });
  };

  if (isLoading) return <div className="loading">Cargando...</div>;
  if (!positionData) return <div className="error">No se encontraron datos de la posición</div>;

  return (
    <Container fluid className="position-container">
      <div className="position-header">
        <ArrowLeft 
          size={24} 
          className="back-arrow" 
          onClick={() => {
            console.log('Navigating back to home'); // Debug: Verificar navegación
            navigate('/'); // Redirige al home
          }} 
        />
        <h1>{positionData.title}</h1>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-board">
          {positionData.phases.map((phase) => (
            <div key={phase.id} className="phase-column">
              <Droppable droppableId={phase.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="phase-container"
                    style={{ borderTop: `4px solid ${phase.color}` }}
                  >
                    <div className="phase-header">
                      <div className="phase-title">
                        <h3>{phase.name}</h3>
                        <span className="phase-order">{positionData.phases.indexOf(phase) + 1}</span>
                      </div>
                      <span className="candidate-count">{phase.candidates.length}</span>
                    </div>
                    <div className="candidates-list">
                      {phase.candidates.map((candidate, index) => (
                        <Draggable
                          key={candidate.id.toString()}
                          draggableId={candidate.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="candidate-card"
                            >
                              <div className="candidate-header">
                                {candidate.avatar && (
                                  <img
                                    src={candidate.avatar}
                                    alt={candidate.name}
                                    className="candidate-avatar"
                                  />
                                )}
                                <div className="candidate-info">
                                  <h4>{candidate.name}</h4>
                                  <span className="last-update">
                                    Última actualización: {candidate.lastUpdate}
                                  </span>
                                </div>
                              </div>
                              <div className="score-container">
                                <div className="score">
                                  <span className="score-label">Puntuación:</span>
                                  <span className="score-value">{candidate.score}</span>
                                </div>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </Container>
  );
};

export default Position;
