export function markNewTickets(tickets, user) {
  // iterate over ticket array
  return tickets.map((ticket) => {
    // ticket is edited by professor
    const editedByProfessor = user.role === 'student' && !ticket.readStudent;

    // ticket is created by student
    const createdByStudent = user.role === 'professor' && !ticket.readProfessor;

    // if either is true the ticket is marked
    if (editedByProfessor || createdByStudent) {
      ticket.mark = true;
    } else ticket.mark = false;
    return ticket;
  });
}
