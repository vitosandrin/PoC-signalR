using ChatService.DataService;
using ChatService.Models;
using Microsoft.AspNetCore.SignalR;

namespace ChatService.Hubs
{
    public class ChatHub(SharedDb sharedDb) : Hub
    {

        private readonly SharedDb _shared = sharedDb;

        public async Task JoinChat(UserConnection connection)
            => await Clients.All
                    .SendAsync("ReceiveMessage", "admin", $"{connection.Username} has joined");

        public async Task JoinSpecificChatRoom(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

            _shared.Connections[Context.ConnectionId] = connection;

            await Clients.Group(connection.ChatRoom)
                .SendAsync("ReceiveMessage", "admin", $"{connection.Username} has joined {connection.ChatRoom}");
        }

        public async Task SendMessage(string message)
        {
            if (_shared.Connections.TryGetValue(Context.ConnectionId, out UserConnection connection))
            {
                await Clients.Group(connection.ChatRoom)
                    .SendAsync("ReceiveMessage", connection.Username, message);
            }
        }



    }
}
