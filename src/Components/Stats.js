import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

/**
 * Statistics Component
 * 
 * This component displays task statistics including:
 * - Total tasks
 * - Completed tasks
 * - Pending tasks
 * - Completion rate
 * 
 * Features:
 * - Real-time statistics from API
 * - Bootstrap card layout
 * - Color-coded metrics
 * - Responsive design
 */
export default function Stats() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    completionRate: 0
  });

  const [loading, setLoading] = useState(true);

  /**
   * Fetch task statistics from API
   * This function calculates statistics based on task data
   */
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // For demo purposes, we'll use mock data
        // In a real app, this would fetch from MockAPI
        const mockTasks = [
          { id: 1, title: "Complete project", status: "completed" },
          { id: 2, title: "Review code", status: "pending" },
          { id: 3, title: "Write documentation", status: "pending" },
          { id: 4, title: "Deploy application", status: "completed" },
          { id: 5, title: "Test functionality", status: "pending" }
        ];

        const total = mockTasks.length;
        const completed = mockTasks.filter(task => task.status === 'completed').length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

        setStats({ total, completed, pending, completionRate });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <Row>
        <Col>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading statistics...</span>
            </div>
          </div>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      {/* Total Tasks */}
      <Col md={3} className="mb-3">
        <Card className="text-center border-primary">
          <Card.Body>
            <Card.Title className="text-primary">
              📊 Total Tasks
            </Card.Title>
            <h2 className="text-primary">{stats.total}</h2>
            <Card.Text className="text-muted">
              All tasks in system
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      {/* Completed Tasks */}
      <Col md={3} className="mb-3">
        <Card className="text-center border-success">
          <Card.Body>
            <Card.Title className="text-success">
              ✅ Completed
            </Card.Title>
            <h2 className="text-success">{stats.completed}</h2>
            <Card.Text className="text-muted">
              Tasks finished
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      {/* Pending Tasks */}
      <Col md={3} className="mb-3">
        <Card className="text-center border-warning">
          <Card.Body>
            <Card.Title className="text-warning">
              ⏳ Pending
            </Card.Title>
            <h2 className="text-warning">{stats.pending}</h2>
            <Card.Text className="text-muted">
              Tasks in progress
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>

      {/* Completion Rate */}
      <Col md={3} className="mb-3">
        <Card className="text-center border-info">
          <Card.Body>
            <Card.Title className="text-info">
              📈 Completion Rate
            </Card.Title>
            <h2 className="text-info">{stats.completionRate}%</h2>
            <Card.Text className="text-muted">
              Success rate
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
