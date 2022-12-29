export function markNewTickets(tickets, user) {
  return tickets.map((ticket) => {
    const editedByProfessor =
      user.role === 'student' && !ticket.readStudent;
    const createdByStudent =
      user.role === 'professor' && !ticket.readProfessor;
    if (editedByProfessor || createdByStudent) {
      ticket.mark = true;
    } else ticket.mark = false;
    return ticket;
  });
}
