import Pagination from '../subcomponents/composite/pagination';
import Request from '../subcomponents/composite/request';
import ResponseForm from '../subcomponents/composite/responseForm';
import Button from '../subcomponents/atomic/button';
import '../../css/ticketDetail.css';
import Response from '../subcomponents/composite/response';

const TicketDetail = ({
  user,
  ticket,
  setTicket,
  totalCount,
  onOverview,
  onPageChange,
  currentDetailPage,
  onSave,
}) => {
  return (
    <div className="ticketDetail">
      <div className="ticketDetail__pagination">
        <Pagination
          itemsCount={totalCount}
          pageSize={1}
          currentPage={currentDetailPage}
          onPageChange={onPageChange}
        />
      </div>

      <div className="ticketDetail__overview">
        <Button label="Overview" onClick={onOverview} />
      </div>

      <h1 className="ticketDetail__title">Ticket status</h1>
      <p className="ticketDetail__id">Ticket number # {ticket._id}</p>

      <div className="request">
        <Request ticket={ticket} />
      </div>

      {user.role === 'professor' ? (
        <div className="response">
          <ResponseForm
            ticket={ticket}
            onSave={onSave}
            setTicket={setTicket}
          />
        </div>
      ) : (
        <div className="response">
          <Response ticket={ticket} />
        </div>
      )}
    </div>
  );
};

export default TicketDetail;
